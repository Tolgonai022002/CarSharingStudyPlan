import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from 'src/cars/entities/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity('rent')
export class RentEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    rentId: number

    @ApiProperty()
    @Column()
    carId: number

    @ApiProperty()
    @Column()
    tariff: number

    @ApiProperty()
    @Column()
    startRentDay: Date


    @ApiProperty()
    @Column()
    endRentDay: Date

    @ManyToOne(()=>CarEntity,(cars)=> cars.carId)
    @JoinColumn({name: 'carId'})
    cars: CarEntity[]
}
