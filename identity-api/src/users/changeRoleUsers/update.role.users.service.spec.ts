import { ChangeRoleUsersService } from './update.role.users.service';
import { InMemoryUserRepository } from '../infra/database/prisma/repositories/inMemoryRepository/user-InMemory.repository';

let createInMemoryUserRepository: InMemoryUserRepository;
let updateRoleUserService: ChangeRoleUsersService;

describe(' Change updade role users', () => {
  beforeEach(() => {
    createInMemoryUserRepository = new InMemoryUserRepository();
    updateRoleUserService = new ChangeRoleUsersService(
      createInMemoryUserRepository,
    );
  });

  it('Admin should be change role user', async () => {
    const sut = await createInMemoryUserRepository.create({
      userName: 'johnDoe',
      password: '1234596!F',
    });

    const changeRole = await updateRoleUserService.execute({
      userId: sut.userId,
      rule: 'USER',
    });

    expect(changeRole.rule).toBe('USER');
  });

  // it('Should not be able change role users if not admin', async () => {
  //   expect(async () => {
  //     const sut = await createInMemoryUserRepository.create({
  //       userName: 'johnDoe',
  //       password: '1234596!F',
  //       rule: Rule.USER,
  //     });

  //     await updateRoleUserService.execute({
  //       userId: sut.userId,
  //       rule: 'ADMIN',
  //     });
  //   }).rejects.toBeInstanceOf(UserIsNotAdmin);
  // });
});
