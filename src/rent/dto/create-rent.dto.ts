import { ApiProperty } from "@nestjs/swagger";

export class CreateRentDto {
    @ApiProperty()
    carId: number

    @ApiProperty()
    tariff: number

    @ApiProperty()
    startRentDay: Date

    @ApiProperty()
    endRentday: Date

    @ApiProperty()
    price: number

    @ApiProperty()
    distnace: number

    // @ApiProperty()
    // totalPrice?: number

    // @ApiProperty()
    // totalDistance?: number
}
