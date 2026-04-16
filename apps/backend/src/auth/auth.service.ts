import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/user.service';
import { MailService } from '../mail/mail.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // ─── Signup ───────────────────────────────────────────
  async signup(dto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    // Send real OTP email
    await this.mailService.sendOtpEmail(dto.email, dto.name, otp);

    return {
      message: 'Account created. Please verify your email with the OTP sent.',
      userId: user._id,
    };
  }

  // ─── Verify OTP ───────────────────────────────────────
  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    await this.usersService.updateById(user._id.toString(), {
      isEmailVerified: true,
      otp: null,
      otpExpiry: null,
    });

    return { message: 'Email verified successfully' };
  }

  // ─── Login ────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id.toString(), email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ─── Get Me ───────────────────────────────────────────
  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  }

  // ─── Forgot Password ──────────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);

    // Always return same message for security
    // Don't reveal if email exists or not
    if (!user) {
      return {
        message: 'If that email exists, a reset link has been sent.',
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.usersService.updateById(user._id.toString(), {
      resetPasswordToken: resetToken,
      resetPasswordExpiry,
    });

    // Send reset email
    await this.mailService.sendPasswordResetEmail(
      user.email,
      user.name,
      resetToken,
    );

    return {
      message: 'If that email exists, a reset link has been sent.',
    };
  }

  // ─── Reset Password ───────────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersService.findByResetToken(dto.token);

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (user.resetPasswordExpiry && user.resetPasswordExpiry < new Date()) {
      throw new BadRequestException('Reset token has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 12);

    await this.usersService.updateById(user._id.toString(), {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    });

    return { message: 'Password reset successfully' };
  }
}
