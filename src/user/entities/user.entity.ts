import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { LIMIT_COLUMN } from "sqlite3";
import { CustomRepositoryDoesNotHaveEntityError, Entity,  Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user'})

export class UserEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    userID: number

    @ApiProperty()
    @IsString()
    @Column()
    username: string

    @ApiProperty()
    @IsString()
    @Column()
    login: string

    @ApiProperty()
    @IsString()
    @Column()
    password: string

    

    // @OneToMany(()=>CustomRepositoryDoesNotHaveEntityError, (rententity)=>rententity.rentUser)
    // rent: RentEntity
}

