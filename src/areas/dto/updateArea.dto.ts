import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAreaDto {
    @ApiPropertyOptional({ description: 'Nombre del área', example: 'Administracion' })
    @IsString()
    @IsOptional()
    readonly nombre?: string;

    @ApiPropertyOptional({ description: 'ID del líder del área', example: 'd2e68b56-bc4c-4d77-9c35-550b4db4f743', required: false }) // UUID del líder
    @IsString()
    @IsOptional()
    readonly lider?: string;  // UUID del líder

    @ApiPropertyOptional({ description: 'Código del área', example: 2 })
    @IsNumber()
    @IsOptional()
    readonly codigo?: number;  // Número con longitud máxima de 2 dígitos

    @ApiPropertyOptional({ description: 'Estado del área', example: 'Activo' })
    @IsEnum(['Activo', 'Inactivo'])
    @IsOptional()
    readonly estado?: 'Activo' | 'Inactivo';

    @ApiPropertyOptional({ description: 'Fecha de publicación', example: '2024-09-10T14:48:00.000Z' })
    @IsDateString()
    @IsOptional()
    readonly publishedAt?: string;
}
