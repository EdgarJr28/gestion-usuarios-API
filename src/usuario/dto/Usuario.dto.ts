import { IsString, IsNotEmpty, IsEmail, IsNumber, IsDateString, IsEnum, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombres del usuario', example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  readonly nombres: string;

  @ApiProperty({ description: 'Apellidos del usuario', example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  readonly apellidos: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1990-05-12' })
  @IsDateString()
  @IsNotEmpty()
  readonly fechaNacimiento: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan.perez@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Número de documento del usuario', example: '1234567' })
  @IsNumber()
  @IsNotEmpty()
  readonly numeroDocumento: number;

  @ApiProperty({ description: 'ID del área asociada al usuario', example: '609d1f1e2e9b1f1b3c4e8f1a' })
  @IsString()  // Cambia a IsString para aceptar solo el ID como cadena
  @IsNotEmpty()
  readonly area: string;  // Cambia el nombre del campo a areaId para reflejar que es un ID

  @ApiProperty({ description: 'Salario del usuario', example: 1500.50 })
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @IsNotEmpty()
  readonly salario: number;

  @ApiProperty({ description: 'Estado del usuario', example: 'Activo' })
  @IsEnum(['Activo', 'Inactivo'])
  @IsNotEmpty()
  readonly estado: 'Activo' | 'Inactivo';
}
