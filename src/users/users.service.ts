import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(private readonly usersRepository: UserRepository) {
    super(usersRepository);
  }
}
