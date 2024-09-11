import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de EJS como motor de vistas
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Configuración de Swagger
  const configSw = new DocumentBuilder()
    .setTitle('API Ludycom')
    .setDescription('Todos los servicios de la API.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSw);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port, '::'); // '::' para que escuche en todas las interfaces de red
  console.log(`Servidor escuchando en el puerto ${port}`);
}

bootstrap();