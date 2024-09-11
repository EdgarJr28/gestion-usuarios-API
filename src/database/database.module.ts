import { Global, Module, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Area } from 'src/areas/entitys/Area.entity';
import { Usuario } from 'src/usuario/entitys/usuario.entity';

const logger = new Logger('DatabaseModule');

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'DB',
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        try {
          return {
            type: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
          /*   password: configService.get<string>('DB_PASSWORD'), */ // en caso de uso, desconmetar y configurar la variable de entorno
            database: configService.get<string>('DB_DATABASE'),
            synchronize: true, // Establecer a 'false' en producción
            autoLoadEntities: true
          };
        } catch (e) {
          logger.error('Database connection error', e);
          throw new UnauthorizedException({
            message: 'Hubo un error de integración de datos',
          });
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
