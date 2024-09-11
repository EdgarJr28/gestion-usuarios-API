import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Area } from "../entitys/Area.entity";
import { CreateAreaDto } from "../dto/createArea.dto";
import { UpdateAreaDto } from "../dto/updateArea.dto";
import { AreaEntRepository } from "../repository/area.repository";

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area, 'DB') private areaRepository: AreaEntRepository,
    ) { }

    async findAll(): Promise<Area[]> {
        try {
            return await this.areaRepository.find({ relations: ['usuarios'] });
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving areas');
        }
    }

    async findOne(id: string): Promise<Area> {
        try {
            const area = await this.areaRepository.findOne({ where: { id }, relations: ['usuarios'] });
            if (!area) {
                throw new NotFoundException(`Area with ID ${id} not found`);
            }
            return area;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error retrieving the area');
        }
    }

    async create(createAreaDto: CreateAreaDto): Promise<Area> {
        try {
            console.log(createAreaDto);
            const area = this.areaRepository.create(createAreaDto);
            return await this.areaRepository.save(area);
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException('Error creating area');
        }
    }

    async update(id: string, updateAreaDto: Partial<UpdateAreaDto>): Promise<Area> {
        try {
            // Verificar si el área existe
            const area = await this.areaRepository.findOneBy({ id });
            if (!area) {
                throw new NotFoundException(`Area with ID ${id} not found`);
            }

            // Aplicar las actualizaciones
            this.areaRepository.merge(area, updateAreaDto);

            // Guardar los cambios
            return await this.areaRepository.save(area);
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating the area');
        }
    }

    async countActiveAreas(): Promise<{ count: number }> {
        try {
            const count = await this.areaRepository.count({
                where: { estado: 'Activo' },
            });
            return { count };
        } catch (error) {
            console.log('Error counting active areas:', error);
            throw new InternalServerErrorException('Error counting active areas');
        }
    }



    async delete(id: string): Promise<void> {
        try {
            const result = await this.areaRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Area with ID ${id} not found`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error deleting the area');
        }
    }
}
