import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;
}
