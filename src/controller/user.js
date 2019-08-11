const User = require('../model/user');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

/**
 * @description function to create user
 * @author "mark bashir"
 * @date 2019-08-08
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} password
 * @param {string} phone
 * @param {string} gender
 * @param {string} email
 * @returns user details or user not found if ID wrong
 */
async function createUser({
  firstName,
  lastName,
  password,
  phone,
  gender,
  email,
  imageUrl = 'default.jpg',
}) {
  const id = uuid();
  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    id,
    firstName,
    lastName,
    password: hash,
    phone,
    gender,
    email,
    imageUrl,
  });
  try {
    let result = await user.save();
    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      phone: result.phone,
      gender: result.phone,
      email: result.email,
      imageUrl: result.imageUrl,
    };
  } catch (error) {
    return 'mail already used';
  }
}

/**
 * @description function to update user details
 * @author "mark bashir"
 * @date 2019-08-09
 * @param {*} mail
 * @param {*} password
 * @param {*} details
 * @returns
 */
async function updateUser(mail, password, details) {
  let foundMail = await User.findOne({ email: mail });
  if (!foundMail) return 'account not found';
  let {
    firstName = foundMail.firstName,
    lastName = foundMail.lastName,
    imageUrl = foundMail.imageUrl,
    phone = foundMail.phone,
  } = details;
  let match = await bcrypt.compare(password, foundMail.password);
  if (!match) return 'wrong password';
  const result = await User.findOneAndUpdate(
    {
      email: mail,
    },
    {
      $set: { firstName, lastName, phone, imageUrl },
    },
    { new: true },
  );

  return {
    id: result.id,
    firstName: result.firstName,
    lastName: result.lastName,
    phone: result.phone,
    gender: result.gender,
    email: result.email,
    imageUrl: result.imageUrl,
  };
}

/**
 * @description function to get user by id
 * @author "mark bashir"
 * @date 2019-08-10
 * @param {string} id
 * @returns user details if user exist
 */
async function getUser(id) {
  const result = await User.aggregate([
    { $match: { id } },

    {
      $project: {
        services: {
          $filter: {
            input: '$services',
            cond: {
              $cmp: ['services.published', true],
              $cmp: ['services.archived', false],
            },
          },
        },
        _id: 0,
        firstName: 1,
        lastName: 1,
        gender: 1,
        email: 1,
        phone: 1,
        imageUrl: 1,
        id: 1,
      },
    },
  ]);
  if (result.length === 0) {
    return 'no user found';
  }
  return result[0];
}

async function getAllUsers() {
  users = await User.aggregate([
    { $sort: { firstName: 1, lastName: 1 } },
    {
      $project: {
        services: {
          $filter: {
            input: '$services',
            cond: {
              $and: [
                {
                  $cmp: ['services.published', true],
                  $cmp: ['services.archived', false],
                },
              ],
            },
          },
        },
        _id: 0,
        firstName: 1,
        lastName: 1,
        gender: 1,
        email: 1,
        phone: 1,
        imageUrl: 1,
        id: 1,
      },
    },
  ]);
  result = users.length === 0 ? 'no user' : users;
  return result;
}
async function createService(
  id,
  role,
  serviceTitle,
  category,
  description,
  published = false,
) {
  let result = await User.findOne({ id });
  if (!result) return 'user not found';

  let { services, firstName, lastName } = result;

  if (services.length >= 5) {
    return 'can not have more than 5 services';
  } else {
    services.push({
      userID: id,
      ref: User.id,
      userName: `${firstName} ${lastName}`,
      serviceID: uuid(),
      role,
      serviceTitle,
      category,
      description,
      published,
    });
    user = await result.save();

    return user.services;
  }
}

async function getAllServices() {
  let services = await User.aggregate([
    { $unwind: '$services' },
    { $project: { services: 1, _id: 0 } },
    {
      $match: {
        $and: [{ 'services.published': true, 'services.archived': false }],
      },
    },
  ]);
  let result = services.length === 0 ? 'no service' : services;
  return result;
}
async function publishService(id, service_ID) {
  let result = await User.findOne({ id });
  if (!result) return 'user not found';

  let service = result.services.find(
    service => service.serviceID === service_ID,
  );
  if (!service) return 'service not found';
  service.published = true;
  let serviceUpdate = await result.save();
  let updatedService = serviceUpdate.services.find(
    service => service.serviceID === service_ID,
  );

  let {
    timeCreated,
    category,
    published,
    userName,
    serviceID,
    role,
    description,
    serviceTitle,
  } = updatedService;
  return {
    timeCreated,
    category,
    published,
    userName,
    serviceID,
    role,
    description,
    serviceTitle,
  };
}
async function archiveService(id, serviceID) {
  let result = await User.findOne({ id });
  if (!result) return 'user with id not found';
  let service = result.services.find(
    service => service.serviceID === serviceID,
  );
  if (!service) return 'service not found';
  service.archived = true;
  await result.save();

  return 'service deleted';
}
async function getService(service_ID) {
  let service = await User.aggregate([
    { $unwind: '$services' },
    { $project: { services: 1, _id: 0 } },
    {
      $match: {
        $and: [
          {
            'services.published': true,
            'services.archived': false,
            'services.serviceID': service_ID,
          },
        ],
      },
    },
  ]);
  if (!service) {
    return 'service not found';
  }
  let {
    timeCreated,
    category,
    published,
    userID,
    userName,
    serviceID,
    role,
    serviceTitle,
    description,
  } = service[0].services;
  return {
    timeCreated,
    category,
    published,
    userID,
    userName,
    serviceID,
    role,
    serviceTitle,
    description,
  };
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updatePassword,
  createService,
  getAllServices,
  publishService,
  archiveService,
  getService,
};
