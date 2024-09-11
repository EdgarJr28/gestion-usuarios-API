import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import { CreateUsuarioDto } from '../dto/Usuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Devuelve todos los usuarios.' })
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get('count-active')
    @ApiOperation({ summary: 'Contar el número de usuarios activos' })
    @ApiResponse({ status: 200, description: 'Devuelve el número de usuarios activos.' })
    async countActiveUsers() {
        const count = await this.usuarioService.countActiveUsers();
        return { count };
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a obtener', example: '612e3b1436c9d1a534bdfcd5' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBody({ type: CreateUsuarioDto })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', example: '612e3b1436c9d1a534bdfcd5' })
    @ApiBody({ type: CreateUsuarioDto })
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    update(@Param('id') id: string, @Body() updateUsuarioDto: any) {
        return this.usuarioService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', example: '612e3b1436c9d1a534bdfcd5' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    delete(@Param('id') id: string) {
        return this.usuarioService.delete(id);
    }
}
