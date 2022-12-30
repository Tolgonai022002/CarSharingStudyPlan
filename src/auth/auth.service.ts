import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService){}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return user
    }

    async registration(userDto: CreateUserDto){
        const oneUsr = await this.userService.findOneUser(userDto.login)
        if(oneUsr){
            throw new HttpException('USER WITH SUCH LOGIN IS ALREADY EXIST!',HttpStatus.BAD_REQUEST)
        }
        const hashPass = await bcrypt.hash(userDto.password,5)
            const user = await this.userService.createUser({...userDto,password:hashPass})
            return this.generateToken(user)
    }

    async generateToken(user: UserEntity){
        const payload = {login: user.login,
                        id: user.userID}
        return {token: this.jwtService.sign(payload)}
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.findOneUser(userDto.login)
        const passEq = await bcrypt.compare(userDto.password,user.password)
        if(user && passEq){
            return this.generateToken(user)
        }
        throw new UnauthorizedException('PASSWORD OR LOGIN IS INCORRECT!')
    }
}
