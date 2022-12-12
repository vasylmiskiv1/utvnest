import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string;
  password: string; 
}

@Table({ tableName: `users` })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique id'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({example: 'something@gmail.com', description: 'User email'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({example: 'password123', description: 'User password'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ApiProperty({example: 'false', description: 'Is user has been banned or not'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  @ApiProperty({example: 'reason', description: 'ban reason'})
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}
