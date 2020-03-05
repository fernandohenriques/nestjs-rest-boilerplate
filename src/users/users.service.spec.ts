import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

class MockRepository<T> {
  public createQueryBuilder = jest.fn(() => this.queryBuilder);

  public manager = {
    transaction: a => Promise.resolve(a()),
  };

  public metadata = {
    connection: {
      options: {
        type: null,
      },
    },
    columns: [],
    relations: [],
  };

  public save = jest.fn();
  public delete = jest.fn();
  public update = jest.fn();
  public findOne = jest.fn();
  public findOneOrFail = jest.fn();
  public find = jest.fn();
  public getMany = jest.fn();

  public queryBuilder = {
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  };
}

class UserRepository extends MockRepository<UserEntity> {}

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
