import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT') ?? 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  // Load and compile handlebars template
  private compileTemplate(templateName: string, context: object): string {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${templateName}.hbs`,
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    return template(context);
  }

  // Send OTP verification email
  async sendOtpEmail(email: string, name: string, otp: string) {
    try {
      const html = this.compileTemplate('otp', {
        name,
        otp,
        expiryMinutes: 10,
      });

      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to: email,
        subject: 'Verify Your Email - NestLaunch',
        html,
      });

      this.logger.log(`OTP email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${email}`, error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string,
  ) {
    try {
      const resetUrl = `https://nestlaunch-api.onrender.com/reset-password?token=${resetToken}`;

      const html = this.compileTemplate('reset-password', {
        name,
        resetUrl,
        expiryMinutes: 60,
      });

      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to: email,
        subject: 'Reset Your Password - NestLaunch',
        html,
      });

      this.logger.log(`Reset password email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${email}`, error);
      throw error;
    }
  }

  async sendPasswordResetOtp(email: string, name: string, otp: string) {
    try {
      const html = this.compileTemplate('reset-otp', {
        name,
        otp,
        expiryMinutes: 10,
      });
      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to: email,
        subject: 'Password Reset OTP — NestLaunch',
        html,
      });
      this.logger.log(`Password reset OTP sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send reset OTP to ${email}`, error);
      throw error;
    }
  }
}
