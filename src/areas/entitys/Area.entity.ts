import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entitys/usuario.entity';

@Entity()
export class Area {
    @PrimaryGeneratedColumn('uuid')
    id: string;  // Columna de tipo UUID para el identificador

    @Column({ length: 50 })
    nombre: string;  // Nombre del área, longitud máxima de 50 caracteres

    @Column({ type: 'uuid' })
    lider: string;  // UUID del líder

    @Column({ type: 'int', width: 2 })
    codigo: number;  // Código del área, número con longitud máxima de 2 dígitos

    @OneToMany(() => Usuario, usuario => usuario.area)
    usuarios: Usuario[];  // Relación uno a muchos con la entidad Usuario

    @Column({ default: 'Activo' })
    estado: 'Activo' | 'Inactivo';  // Estado del área, con valor por defecto 'Activo'

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publishedAt: Date;  // Fecha de publicación, con valor por defecto la fecha actual
}
