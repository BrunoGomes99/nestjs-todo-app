import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do swagger
  const config = new DocumentBuilder()
    .setTitle('TodoApp API')
    .setDescription('Aplicação de geração de tarefas para estudo da ferramenta NestJs')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Esse 'swagger' é o endereço/url que é usada para acessar o swagger


// Pipes são classes que são executadas antes dos controllers serem chamados.
  // Geralemente são usadas para transformar dados vindos do front ou validá-los (que é o nosso caso ao usar o ValidationPipe)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(3000);
}
bootstrap();
