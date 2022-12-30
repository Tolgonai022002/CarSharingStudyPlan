import { ApiProperty } from "@nestjs/swagger";

export class UpdateCarDto {
    @ApiProperty()
    brand: string

    @ApiProperty()
    model: string

    @ApiProperty()
    VIN: string
}