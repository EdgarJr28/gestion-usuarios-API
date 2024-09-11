import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entitys/usuario.entity';
import { CreateUsuarioDto } from '../dto/usuario.dto'; // Asegúrate de que el nombre del archivo sea correcto
import { Area } from 'src/areas/entitys/area.entity';
import { UsuarioEntRepository } from '../repository/article.repository';
import { AreaEntRepository } from '../../areas/repository/area.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario, 'DB') private usuarioRepository: UsuarioEntRepository,
    @InjectRepository(Area, 'DB') private areaRepository: AreaEntRepository
  ) { }

  async findAll(): Promise<Usuario[]> {
    try {
      // Obtiene todos los usuarios con la relación del área
      return await this.usuarioRepository.find({ relations: ['area'] });
    } catch (error) {
      console.log('Error retrieving users:', error);
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  async findOne(id: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['area'],
      });
      if (!usuario) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error retrieving the user:', error);
      throw new InternalServerErrorException('Error retrieving the user');
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      console.log(createUsuarioDto);
      const areaId = createUsuarioDto.area;
      const area = await this.areaRepository.findOneBy({ id: areaId });
      if (!area) {
        throw new BadRequestException(`Area with ID ${createUsuarioDto.area} not found`);
      }

      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        area,
      });

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.log('Error creating the user:', error);
      throw new InternalServerErrorException('Error creating the user');
    }
  }

  async update(id: string, updateUsuarioDto: any): Promise<Usuario> {
    try {
      const result = await this.usuarioRepository.update(id, updateUsuarioDto);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error updating the user:', error);
      throw new InternalServerErrorException('Error updating the user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.usuarioRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error deleting the user:', error);
      throw new InternalServerErrorException('Error deleting the user');
    }
  }
  async countActiveUsers(): Promise<number> {
    try {
      return await this.usuarioRepository.count({
        where: { estado: 'Activo' },
      });
    } catch (error) {
      console.log('Error counting active users:', error);
      throw new InternalServerErrorException('Error counting active users');
    }
  }
}
