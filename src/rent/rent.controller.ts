import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  createNewRent(@Body() createRentDto: CreateRentDto) {
    const rents = this.rentService.createCarRent(createRentDto);

    
    return rents
  }

  @Get()
  getAllRents(){
    return this.rentService.getRents()
  }

  // @Get()
  // getRentById(rentId:number){
  //   return await this.rentService.
  // }

  @Delete()
  async removeRent(rentId:number){
    await this.rentService.removeRent(rentId)
  }
}
