import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {

  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('The task management API to manipulate CRUD operations')
    .setVersion('1.0')
    .setTermsOfService('Terms & Conditions')
    .setContact('Manivannan Durairaj', 'https://google.com', 'd.manig@gmail.com')
    .setBasePath('/api/v1')
    // .addServer('http://localhost:3000', 'Local server')
    // .addServer('http://localhost:4000', 'SSL server')
    .addBearerAuth({ type: 'http', bearerFormat: 'JWT', scheme: 'bearer', name: 'Authorization', description: 'Directly pastre your token below the text box', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger/api', app, document, {
    explorer: true,
    // swaggerUrl: 'http://localhost:3000',
    customSiteTitle: 'Task Management',
    swaggerOptions: {
      docExpansion: 'none', // <— this option
      filter: true,
      showRequestDuration: true,
    },
  } as SwaggerCustomOptions);

  const port = 3000;
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()} :: ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
