import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity as User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(private readonly usersRepository: UserRepository) {
    super(usersRepository);
  }
}
