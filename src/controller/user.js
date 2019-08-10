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
  const result = await User.findOneAndUpdate(
    {
      email: mail,
      password,
    },
    {
      $set: details,
    },
    { new: true },
  );
  if (!result) {
    return 'incorrect details';
  }

  let { firstName, lastName, phone, gender, email } = result;
  return { firstName, lastName, phone, gender, email };
}

async function getUser(id) {
  const result = await User.aggregate([
    { $match: { id } },

    {
      $project: {
        services: {
          $filter: {
            input: '$services',
            cond: { $cmp: ['services.published', true] },
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

async function updatePassword(email, password, newPassword) {
  const result = await User.findOneAndUpdate(
    { email, password },
    {
      $set: {
        password: newPassword,
      },
    },
  );
  if (!result) return 'incorrect details';

  return 'password updated';
}
async function getAllUsers() {
  users = await User.aggregate([
    { $sort: { firstName: 1, lastName: 1 } },
    {
      $project: {
        services: {
          $filter: {
            input: '$services',
            cond: { $cmp: ['services.published', true] },
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
    { $match: { 'services.published': true } },
  ]);
  let result = services.length === 0 ? 'no service' : services;
  return result;
}
function publishService(email, serviceID) {
  return new Promise(async (resolve, reject) => {
    try {
      // result = await User.findOne({email});
      // if(result===null){
      //   throw new Error('user not found');
      // }
      service = await User.aggregate([
        { $unwind: '$services' },
        { $project: { services: 1, _id: 0 } },
        {
          $match: {
            'services.published': false,
            'services._id': mongoose.Types.ObjectId(serviceID),
          },
        },
      ]);
      if (service.length === 0) throw new Error('service already published');
      resolve(service);
    } catch (error) {
      reject(error.message);
    }
  });
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updatePassword,
  createService,
  getAllServices,
};
