import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_CONFIG } from './utils/db_config';
import { CarsModule } from './cars/cars.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), AuthModule, UserModule, CarsModule, RentModule],

})
export class AppModule {}
