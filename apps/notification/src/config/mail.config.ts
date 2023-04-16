import * as path from 'path';
import { ConfigService, registerAs } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailOptions = registerAs('mail', () => ({
  host: process.env.MAIL_SMTP_HOST,
  port: process.env.MAIL_SMTP_PORT,
  user: process.env.MAIL_SMTP_NAME,
  password: process.env.MAIL_SMTP_PASSWORD,
  from: process.env.MAIL_FROM,
}));

export function getMailConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get('mail.host'),
        port: configService.get('mail.port'),
        secure: false,
        auth: {
          user: configService.get('mail.user'),
          pass: configService.get('mail.password'),
        },
      },
      defaults: {
        from: configService.get('mail.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
