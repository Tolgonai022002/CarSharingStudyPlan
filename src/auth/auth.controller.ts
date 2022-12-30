import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
  }

  @Post('/regis')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }

}