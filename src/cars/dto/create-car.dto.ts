import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty()
    brand: string

    @ApiProperty()
    model: string

    @ApiProperty()
    VIN: string
}
