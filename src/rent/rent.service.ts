import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RentEntity } from '../rent/entities/rent.entity'
import { CarsService } from '../cars/cars.service'
import { BadRequestException } from "@nestjs/common";
import { UserEntity } from 'src/user/entities/user.entity';
// import { TariffsPrice } from '../rent/enum'



export type TariffsPrice={
  id:number,
  price:number,
  distance: number
}

@Injectable()
export class RentService{
    constructor(@InjectRepository(RentEntity) 
    private rentRepo: Repository<RentEntity>,){}
    // private readonly carService: CarsService,
    private readonly tariffsPrice: TariffsPrice[]=[
                            {
                              id:1,
                              price: 270,
                              distance:200
                            },
                            {
                              id:2,
                              price:330,
                              distance:350
                            },
                            {
                              id:3,
                              price:390,
                              distance:500
                            }
    ] 


    async createCarRent(dto: CreateRentDto){
      if(dto.tariff>3 || dto.tariff<0){
        throw new BadRequestException('NOT FOUND!')
      }

      let start = new Date(dto.startRentDay).getDate()
      let end = new Date(dto.endRentday).getDate()
      if(start === 0 || start === 6){
        throw new BadRequestException("Начало аренды не должно выпадать на выходной день!")
      }
      if( end === 0 || end === 6){
        throw new BadRequestException("Конец аренды не должен выпадать на выходной день!")
      }
      const period = end -start
      if(period<=0){
        return 'Аренда автомобиля не может быть менее одного дня!'
      }
      if(period>=30){
        return 'Максимальный срок аренды  не может превышать 30 дней!'
      }

      if(period>=3 && period<=5){
        dto.price = dto.price*period-((dto.price*5)/100)
        dto.distnace = dto.distnace*period
        console.log(dto.price)
        console.log(dto.distnace)
        return `Price:${dto.price} Distance${dto.distnace}`
      }
      if(period>=6 && period<=14){
        dto.price = dto.price*period-((dto.price*10)/100)
        dto.distnace = dto.distnace*period
        console.log(dto.price)
        console.log(dto.distnace)
        return `Price:${dto.price} Distance${dto.distnace}`
      }
      if(period>=15 && period<=30){
        dto.price = dto.price*period-((dto.price*15)/100)
        dto.distnace = dto.distnace*period
        console.log(dto.price)
        console.log(dto.distnace)
        return `Price:${dto.price} Distance${dto.distnace}`
      }
    }
    async countDays(dto: CreateRentDto){
      const start = new Date(dto.startRentDay).getDay()
      const end = new Date(dto.endRentday).getDay()
      const period2 : number = end-start
      return period2
    }

   async getRents(): Promise<RentEntity[]>{
    return await this.rentRepo.find()
   }

  async removeRent(rentId: number){
    await this.rentRepo.delete(rentId)
  }
 
    
}