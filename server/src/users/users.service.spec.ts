import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    user: {
      create: jest.Mock;
      update: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  const mockUser = {
    id: 1,
    email: 'user@example.com',
    username: 'alice',
    hash: 'hashed',
    refreshToken: null,
  };

  beforeEach(async () => {
    prisma = {
      user: {
        create: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a user via the Prisma client', async () => {
    prisma.user.create.mockResolvedValue(mockUser);

    const result = await service.createUser({
      email: 'user@example.com',
      username: 'alice',
      hash: 'hashed',
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'user@example.com', username: 'alice', hash: 'hashed' },
    });
    expect(result).toEqual(mockUser);
  });

  it('updates a user', async () => {
    prisma.user.update.mockResolvedValue({ ...mockUser, refreshToken: 'rt' });

    await service.updateUser(1, { refreshToken: 'rt' });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { refreshToken: 'rt' },
    });
  });

  it('finds a user by email', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.findUserByEmail('user@example.com');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com' },
    });
    expect(result).toEqual(mockUser);
  });

  it('finds a user by id', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.findById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockUser);
  });
});
