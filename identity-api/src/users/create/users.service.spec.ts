/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { InMemoryUserRepository } from '../infra/database/prisma/repositories/inMemoryRepository/user-InMemory.repository';
import { UserAlreadyExists } from '../errors/user-already-exists.error';
import { PasswordValidator } from '../errors/password-validator';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserService: UsersService;

describe(' Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserService = new UsersService(inMemoryUserRepository);
  });

  it('Should be able create a new User', async () => {
    const sut = await createUserService.execute({
      userName: 'johnDoe',
      password: '1234596!F@@',
    });

    expect(sut).toHaveProperty('userId');
  });

  it('Should not be able create a user if userName exists', async () => {
    await expect(async () => {
      const sut = await createUserService.execute({
        userName: 'johnDoe',
        password: '1234596!F@',
      });

      await createUserService.execute({
        userName: sut.userName,
        password: sut.password,
      });
    }).rejects.toBeInstanceOf(UserAlreadyExists);
  });

  it('Should validate rules of password', async () => {
    await expect(
      createUserService.execute({
        userName: 'johnDoe',
        password: '12222',
      }),
    ).rejects.toBeInstanceOf(PasswordValidator);
  });
});
