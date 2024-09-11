import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Area } from '../../areas/entitys/Area.entity'; // Ajusta la ruta si es necesario

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string; // O usa `uuid` si es UUID el tipo

    @Column({ length: 50 })
    nombres: string;

    @Column({ length: 50 })
    apellidos: string;

    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ type: 'bigint', unique: true })
    numeroDocumento: number;

    @ManyToOne(() => Area, area => area.usuarios)
    area: Area;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salario: number;

    @Column({ default: 'Activo' })
    estado: 'Activo' | 'Inactivo';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publishedAt: Date;
}
