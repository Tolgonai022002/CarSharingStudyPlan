import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class CarsService {

  constructor(@InjectRepository(CarEntity) private carRepo: Repository<CarEntity>){}
// Get all cars
  async getAllCars(): Promise<CarEntity[]>{
    return await this.carRepo.find()
  }
//Get car by ID
  async getCarById(carId: number): Promise<CarEntity>{
    return await this.carRepo.findOneBy({carId})
  }
// Update one car by ID
  async updateOneCarInfo(carId: number,dto: UpdateCarDto): Promise<CarEntity>{
    const updateCar = await this.carRepo.findOneBy({carId})
    if(!updateCar){
      throw new BadRequestException('CAR WITH SUCH ID WAS NOT FOUND!')
    }
    Object.assign(updateCar,dto)
    return await this.carRepo.save(updateCar)
  }
// Delete car by ID
  async deleteCarById(carId: number){
    const delCar = await this.carRepo.findOneBy({carId})
    if(!delCar){
      throw new BadRequestException('CAR WITH SUHC ID WAS NOT FOUND!')
    }
    await this.carRepo.delete(delCar)
  }

// Create car by 
  async createNewCar(createDto: CreateCarDto): Promise<CarEntity>{
    return await this.carRepo.save(createDto)
  }
}
