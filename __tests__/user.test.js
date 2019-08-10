const { connectDatabase, disconnectDatabase } = require('../test-setup/setup');
const { createUser, getUser, getAllUsers } = require('../src/controller/user');
describe('test for user controller', () => {
  const userDetails = {
    firstName: 'mark',
    lastName: 'bashir',
    password: 'password',
    phone: '07035609475',
    gender: 'female',
    email: 'stolidp@gmail.com',
  };
  let userID;
  const wrondID = '212232';

  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });
  test('should return an Object containing user details', async () => {
    let result = await createUser({ ...userDetails });
    userID = result.id;
    expect(result).toMatchObject({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      phone: expect.any(String),
      gender: expect.any(String),
      email: expect.any(String),
      imageUrl: expect.any(String),
    });
  });
  test('should return mail already used', async () => {
    let result = await createUser({ ...userDetails });
    expect(result).toMatch('mail already used');
  });
  test('should return  user', async () => {
    let result = await getUser(userID);
    console.log(result);
    expect(result).toMatchObject({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      phone: expect.any(String),
      gender: expect.any(String),
      email: expect.any(String),
      imageUrl: expect.any(String),
      services: expect.any(Array),
    });
  });
  test('should return user not found', async () => {
    let result = await getUser(wrondID);
    expect(result).toMatch('no user found');
  });
  test('should return all users', async () => {
    expect(await getAllUsers()).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          phone: expect.any(String),
          gender: expect.any(String),
          email: expect.any(String),
          imageUrl: expect.any(String),
          services: expect.any(Array),
        },
      ]),
    );
  });
});
