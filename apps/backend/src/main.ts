import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestLaunch API')
    .setDescription(
      `
      ## 🚀 NestLaunch - Production Ready SaaS Boilerplate API
      
      ### Authentication
      Most endpoints require a **Bearer JWT token**.
      
      1. Use **/auth/signup** to create an account
      2. Verify your email via **/auth/verify-otp**
      3. Use **/auth/login** to get your token
      4. Click **Authorize** button and paste your token
      `,
    )
    .setVersion('1.0')
    .setContact(
      'NestLaunch',
      'https://github.com/Hamzaa6296/nestlaunch',
      'support@nestlaunch.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📋 Swagger docs at http://localhost:${port}/api`);
}
bootstrap();
