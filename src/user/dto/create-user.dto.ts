import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    username: string

    @ApiProperty()
    login: string

    @ApiProperty()
    password: string
    
}
