import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { SERVE_ROOT } from '../app.constants';

export function getServeStaticConfig(): ServeStaticModuleAsyncOptions {
  return {
    imports: undefined,
    useFactory: (configService: ConfigService) => [
      {
        rootPath: configService.get('uploads.path'),
        serveRoot: SERVE_ROOT,
      },
    ],
    inject: [ConfigService],
  };
}
