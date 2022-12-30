import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuards } from '../auth/guard/jwt-guard'

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @UseGuards(JwtAuthGuards)
  @Post('postRent')
  createNewRent(@Body() createRentDto: CreateRentDto) {
    const rents = this.rentService.createCarRent(createRentDto);
    return rents
  }

  @UseGuards(JwtAuthGuards)
  @Get('getall')
  getAllRents(){
    return this.rentService.getRents()
  }

  @UseGuards(JwtAuthGuards)
  @Delete()
  async removeRent(rentId:number){
    await this.rentService.removeRent(rentId)
  }
}
