import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ description: 'Nombre del área', example: 'Recursos Humanos' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Código del área', example: 12 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)  // Validación mínima
  @Max(99) // Validación máxima, asegurando que el número tiene hasta 2 dígitos
  readonly codigo: number;

  @ApiProperty({ description: 'ID del líder del área', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()  // UUID se maneja como string en DTO
  @IsNotEmpty()
  readonly lider: string;

  @ApiProperty({ description: 'Estado del área', example: 'Activo' })
  @IsEnum(['Activo', 'Inactivo'])
  @IsNotEmpty()
  readonly estado: 'Activo' | 'Inactivo';

  @ApiProperty({ description: 'Fecha de publicación', example: '2024-09-10T14:48:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  readonly publishedAt?: string;
}
