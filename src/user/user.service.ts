import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>){}

    async createUser(dto: CreateUserDto){
      return await this.userRepo.save(dto)
    }

    async getAllUsers(){
      return await this.userRepo.find()
    }

    async findOneUser(login: string){
      return await this.userRepo.findOne({where:{login:login}})
    }

    async updateUser(userID: number, updateDto: UpdateUserDto){
      const user = await this.userRepo.findOneBy({userID})
      Object.assign(user,updateDto)
      return await this.userRepo.save(user)
    }

    async removeUser(userID:number){
      const deleteduser = await this.userRepo.delete(userID)
      return 'USER WAS SUCCESSFULLY DELETED!'
    }

    async getUserById(userID:number){
      return await this.userRepo.findOne({where:{userID:userID}})
    }
}
