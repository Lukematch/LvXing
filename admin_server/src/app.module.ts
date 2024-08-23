import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AnnouncementModule } from './announcement/announcement.module';
import * as path from 'path'

// const isProd = process.env.NODE_ENV == 'production'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   // envFilePath: [isProd ? path.resolve('.env.production') : path.resolve('.env')],
    //   envFilePath: path.resolve('.env'),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      synchronize: true,
      // synchronize: !isProd,
      autoLoadEntities: true,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'lvxing',
    }),
    MenuModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
