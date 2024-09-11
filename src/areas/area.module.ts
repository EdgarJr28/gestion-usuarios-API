import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './controllers/area.controller';
import { AreaService } from './services/area.service';
import { Area } from './entitys/Area.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Area], 'DB')
  ],
  providers: [AreaService],
  controllers: [AreaController],
  exports: [AreaService]
})
export class AreaModule { }
