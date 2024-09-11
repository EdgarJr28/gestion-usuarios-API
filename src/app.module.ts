import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { environment } from './enviroment';
import { UsuarioModule } from './usuario/usuario.module';
import { AreaModule } from './areas/area.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UsuarioModule,
    AreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
