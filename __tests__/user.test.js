const { connectDatabase, disconnectDatabase } = require('../test-setup/setup');
const {
  createUser,
  getUser,
  getAllUsers,
  createService,
  getAllServices,
  publishService,
  archiveService,
  getService,
  updateUser,
} = require('../src/controller/user');
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
  const wrongID = '212232';
  let serviceID;

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
    let result = await getUser(wrongID);
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
  test('should return service created', async () => {
    let result = await createService(
      userID,
      'software engineer',
      'IT services',
      'all industries',
      'provide IT solutions to IT firms',
      true,
    );
    serviceID = result[0].serviceID;
    expect(result).toHaveLength(1);
  });
  test('should return user not found', async () => {
    let result = await createService(
      wrongID,
      'software engineer',
      'IT services',
      'all industries',
      'provide IT solutions to IT firms',
    );

    expect(result).toMatch('user not found');
  });
  test('should return all services', async () => {
    let result = await getAllServices();
    expect(result).toHaveLength(1);
  });
  test('should publish service', async () => {
    let result = await publishService(userID, serviceID);
    expect(result).toMatchObject({
      timeCreated: expect.any(Date),
      category: expect.any(String),
      published: expect.any(Boolean),
      userName: expect.any(String),
      serviceID: expect.any(String),
      role: expect.any(String),
      description: expect.any(String),
      serviceTitle: expect.any(String),
    });
  });
  test('should returns service ', async () => {
    let result = await getService(serviceID);
    expect(result).toMatchObject({
      timeCreated: expect.any(Date),
      category: expect.any(String),
      published: expect.any(Boolean),
      userName: expect.any(String),
      serviceID: expect.any(String),
      role: expect.any(String),
      description: expect.any(String),
      serviceTitle: expect.any(String),
    });
  });
  test('should return service deleted successfully', async () => {
    let result = await archiveService(userID, serviceID);
    expect(result).toMatch('service deleted');
  });
  test('should return updated details', async () => {
    let result = await updateUser(userDetails.email, userDetails.password, {
      firstName: 'mark',
    });
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
});
