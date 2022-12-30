
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { RentEntity } from 'src/rent/entities/rent.entity'

@Entity('cars')

export class CarEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    carId: number

    @ApiProperty()
    @Column()
    brand: string

    @ApiProperty()
    @Column()
    VIN: string

    @ApiProperty()
    @Column()
    model: string


    @OneToMany(()=>RentEntity,(rent)=>rent.cars)
    rent: RentEntity[]
}
