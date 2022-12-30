import { Module,forwardRef } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { CarEntity } from 'src/cars/entities/car.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CarsModule } from 'src/cars/cars.module';
import { AuthModule } from 'src/auth/auth.module';
import { CarsService } from 'src/cars/cars.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([RentEntity,CarEntity]),forwardRef(()=>AuthModule)],
  controllers: [RentController],
  providers: [RentService,CarsService],
  // exports:[TypeOrmModule]

})
export class RentModule {}
