import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  
  @Post('postCar')
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createNewCar(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carsService.getCarById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.updateOneCarInfo(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carsService.deleteCarById(+id);
  }
}
