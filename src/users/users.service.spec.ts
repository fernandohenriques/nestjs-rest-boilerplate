import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserRepository } from '../../test/mocks/repositories/user.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const testUser: UserEntity = {
      id: 1,
      username: 'johndoe',
      displayName: 'John Doe',
      email: 'johndoe@johndoe.com',
      birthDate: new Date('1990-04-10'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(repo, 'find').mockResolvedValueOnce([testUser]);
    expect(await service.find()).toEqual([testUser]);
  });
});
