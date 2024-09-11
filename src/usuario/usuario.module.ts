import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './entitys/usuario.entity';
import { Area } from 'src/areas/entitys/Area.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Area], 'DB')
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService]
})
export class UsuarioModule { }
