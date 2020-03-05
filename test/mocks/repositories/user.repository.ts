import { UserEntity } from '../../../src/users/entities/user.entity';
import { MockRepository } from '../mock.repository';

export class UserRepository extends MockRepository<UserEntity> {}
