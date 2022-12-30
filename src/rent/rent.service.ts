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


    // async CreateNewRent(dto: CreateRentDto){
    //   return await this.rentRepo.save(dto)
    // }
    async createCarRent(dto: CreateRentDto){
      const allCars = await this.rentRepo.find({where:{carId: dto.carId}})
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
      // const period2: number = (end-start)/1000/60/60/24
      const period2 : number = end-start
      return period2
    }

   async getRents(): Promise<RentEntity[]>{
    return await this.rentRepo.find()
   }

  //  async findActive(){

  //  }

  async removeRent(rentId: number){
    await this.rentRepo.delete(rentId)
  }
      


      // const period = end - start
      // if(period<=0){
      //   throw new BadRequestException('Аренда автомобиля не может быть менее одного дня!')
      // }
      // const period = end - start
      // if(period>30){
      //   throw new BadRequestException("Максимальный срок аренды  не может превышать 30 дней!")
      // }

      // let result = 0 
      // let resDis = 0
      // dto.price = daysPeriod*selectTariff
      // dto.distnace = daysPeriod*selectDistance
      // const daysPeriod = dto.endRentday.getDay()-dto.startRentDay.getDay()
    //  let daysPeriod = end -start
    //   if(daysPeriod>=3 && daysPeriod<=5){
    //     result = dto.price*daysPeriod -((dto.price*daysPeriod*5)/100)
    //     resDis = result*dto.distnace
    //     // return `Price: ${result} 
    //     //         Distance: ${resDis}`
    //     console.log(`Price: ${result} Distance: ${resDis}`)
    //     return `Price: ${result} Distance: ${resDis}`
        
    //   }
      // if(daysPeriod>=6 && daysPeriod<=14){
      //   result = dto.price*daysPeriod -((dto.price*daysPeriod*10)/100)
      //   resDis = result*dto.distnace
      //   // return `Price: ${result} 
      //   //         Distance: ${resDis}`
      //   console.log(`Price: ${result} Distance: ${resDis}`)
        
      //   return `Price: ${result} Distance: ${resDis}`
      // }
      // if(daysPeriod>=15 && daysPeriod<=30){
      //   result = dto.price*daysPeriod -((dto.price*daysPeriod*15)/100)
      //   resDis = result*dto.distnace
      //   console.log(`Price: ${result} Distance: ${resDis}`)
      //   return `Price: ${result} Distance: ${resDis}`
      // }


      // let tariff = TariffsPrice(dto.tariff)
// ========================================================================================================
      // let daysPeriod = await this.countDays(dto)
      // const selectTariff:any = await  this.tariffsPrice.find((oneTariff)=>oneTariff.price === dto.price)
      // // const selectDistance:any = await  this.tariffsPrice.find((oneDis)=>oneDis.distance === dto.distnace)
      // if(selectTariff){
      //   dto.price = selectTariff.price*daysPeriod
      //   dto.distnace = selectTariff.price*dto.distnace
      //   console.log(dto.price)
      //   console.log(dto.distnace)
      //   return `Price: ${dto.price}, Distance: ${dto.distnace}`
      // //=============================================================================================================== 
      //   // return dto.distnace = selectTariff.price*daysPeriod
      // }
    

// let discount = 0
      // dto.price = daysPeriod*selectTariff
      // dto.distnace = daysPeriod*selectDistance


      // if(daysPeriod>=3 && daysPeriod<=5){
      //   // dto.price = dto.price-((dto.price/100)*5)
      //   // discount = Math.floor(dto.price-((dto.price*5)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*5)/100)
        
      // }else if( daysPeriod>=6 && daysPeriod<=14){
      //   // dto.price = dto.price-((dto.price/100)*10)
      //   // discount = Math.floor(dto.price-((dto.price*10)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*10)/100)
      // }else if( daysPeriod>=15 && daysPeriod<=30){
      //   // dto.price = dto.price-((dto.price/100)*15)
      //   // discount = Math.floor(dto.price-((dto.price*15)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*15)/100)
      // }
    

    // async calcDiscoutn(dto:CreateRentDto){
    //   let result = 0 
    //   let resDis = 0
    //   // dto.price = daysPeriod*selectTariff
    //   // dto.distnace = daysPeriod*selectDistance
    //   const daysPeriod = dto.endRentday.getDay()-dto.startRentDay.getDay()
    //   if(daysPeriod>=3 && daysPeriod<=5){
    //     result = dto.price*daysPeriod -((dto.price*daysPeriod*5)/100)
    //     resDis = result*dto.distnace
    //     // return `Price: ${result} 
    //     //         Distance: ${resDis}`
    //     console.log(`Price: ${result} Distance: ${resDis}`)
    //   }
    //   if(daysPeriod>=6 && daysPeriod<=14){
    //     result = dto.price*daysPeriod -((dto.price*daysPeriod*10)/100)
    //     resDis = result*dto.distnace
    //     // return `Price: ${result} 
    //     //         Distance: ${resDis}`
    //     console.log(`Price: ${result} Distance: ${resDis}`)
    //   }
    //   if(daysPeriod>=15 && daysPeriod<=30){
    //     result = dto.price*daysPeriod -((dto.price*daysPeriod*15)/100)
    //     resDis = result*dto.distnace
    //     console.log(`Price: ${result} Distance: ${resDis}`)
    //   }
    // }

      // if(daysPeriod>=3 && daysPeriod<=5){
      //   // dto.price = dto.price-((dto.price/100)*5)
      //   // discount = Math.floor(dto.price-((dto.price*5)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*5)/100)
        
      // }else if( daysPeriod>=6 && daysPeriod<=14){
      //   // dto.price = dto.price-((dto.price/100)*10)
      //   // discount = Math.floor(dto.price-((dto.price*10)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*10)/100)
      // }else if( daysPeriod>=15 && daysPeriod<=30){
      //   // dto.price = dto.price-((dto.price/100)*15)
      //   // discount = Math.floor(dto.price-((dto.price*15)/100))
      //   // return discount
      //   dto.price = dto.price-((dto.price*15)/100)
      // }
    
}