import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index') // Nombre del archivo EJS sin la extensión
  @ApiOperation({ summary: 'Obtener la pagina de bienvenida' })
  @ApiResponse({ status: 200, description: 'Devuelve la vista de bienvenida.' })
  getHello() {
    let config = {
      message: this.appService.getHello(),
      title: 'API',
      PORT: process.env.PORT || 3000,
      devName: 'Ed'
    }

    // Devolvemos un objeto con los parámetros
    return { config };
  }
}
