import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public readonly service: UsersService) {}

  @Get('/hello')
  getHello(): { text: string } {
    return this.service.getHello();
  }
}
