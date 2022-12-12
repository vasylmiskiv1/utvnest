import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'email@gmail.com', description: 'User email'})
  readonly email: string;
  @ApiProperty({ example: 'password123', description: 'User password'})
  readonly password: string;
}