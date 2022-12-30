import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { RentEntity } from 'src/rent/entities/rent.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CarEntity, RentEntity])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsModule, CarsService]
})
export class CarsModule {}
