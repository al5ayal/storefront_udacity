import { User } from '../../interfaces/User';
import supertest from 'supertest';
import { app } from '../../app';
import UserModel from '../../models/User.model';
const request = supertest(app);

const user = new UserModel();
const userData: User = {
  first_name: 'firstname',
  last_name: 'lastname',
  username: 'username',
  email: 'username@test.test',
  password: '123456'
};

describe('Users Model', () => {
  it(`It should have create method`, async () => {
    expect(user.create).toBeDefined();
  });

  it(`create should return a user object`, async () => {
    const result = await user.create(userData);
    userData.id = result.id;
    expect(result).toEqual(userData);
  });

  it(`It should have findAll/index method`, async () => {
    expect(user.findAll).toBeDefined();
  });

  it(`findAll/index should return a list of users`, async () => {
    const result = await user.findAll();
    delete userData.password;
    expect(result).toEqual([userData]);
  });

  it(`It should have findById method`, async () => {
    expect(user.findById).toBeDefined();
  });

  it(`findById should return a user`, async () => {
    const result = await user.findById(userData.id as number);
    delete userData.password;
    expect(result).toEqual(Object(userData));
  });

  it(`It should have findByEmail method`, async () => {
    expect(user.findByEmail).toBeDefined();
  });

  it(`findByEmail should return a user`, async () => {
    const result = await user.findByEmail(userData.email);
    delete userData.password;
    expect(result).toEqual(Object(userData));
  });

  it(`It should have destroy method`, async () => {
    expect(user.destroy).toBeDefined();
  });

  it(`destroy should return a user`, async () => {
    const result = await user.destroy(userData.id as number);
    expect(result).toEqual(true);
  });

});
