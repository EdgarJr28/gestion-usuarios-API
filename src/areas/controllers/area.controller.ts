import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AreaService } from '../services/area.service';
import { ObjectId } from 'mongodb';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateAreaDto } from '../dto/updateArea.dto';
import { CreateAreaDto } from '../dto/createArea.dto';

@ApiTags('Areas')
@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las áreas' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las áreas.' })
  findAll() {
    return this.areaService.findAll();
  }

  @Get('count-active')
  @ApiOperation({ summary: 'Contar el número de áreas activas' })
  @ApiResponse({ status: 200, description: 'Devuelve el número de áreas activas.' })
  @ApiResponse({ status: 500, description: 'Error al contar áreas activas.' })
  countActiveAreas() {
    return this.areaService.countActiveAreas();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un área por ID' })
  @ApiParam({ name: 'id', description: 'ID del área a obtener', example: '612e3b1436c9d1a534bdfcd5' })
  @ApiResponse({ status: 200, description: 'Área encontrada correctamente.' })
  @ApiResponse({ status: 404, description: 'Área no encontrada.' })
  async findOne(@Param('id') id: string) {
      return await this.areaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un área' })
  @ApiBody({ type: CreateAreaDto })
  @ApiResponse({ status: 201, description: 'Área creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  async create(@Body() createAreaDto: CreateAreaDto) {
    return await this.areaService.create(createAreaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un área' })
  @ApiParam({ name: 'id', description: 'ID del área a actualizar', example: '612e3b1436c9d1a534bdfcd5' })
  @ApiBody({ type: UpdateAreaDto })
  @ApiResponse({ status: 200, description: 'Área actualizada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Área no encontrada.' })
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
      return await this.areaService.update(id, updateAreaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un área por ID' })
  @ApiParam({ name: 'id', description: 'ID del área a eliminar', example: '612e3b1436c9d1a534bdfcd5' })
  @ApiResponse({ status: 200, description: 'Área eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Área no encontrada.' })
  async delete(@Param('id') id: string) {
      return await this.areaService.delete(id);
  }
}
