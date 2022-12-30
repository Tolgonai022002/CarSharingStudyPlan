import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuards } from '../auth/guard/jwt-guard'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @ApiOperation({summary:'Get all users'})
  @UseGuards(JwtAuthGuards)
  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary:'Get one user by ID'})
  @UseGuards(JwtAuthGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @ApiOperation({summary:'Update user by ID'})
  @UseGuards(JwtAuthGuards)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({summary:'Get one user by ID and remove it'})
  @UseGuards(JwtAuthGuards)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
