const User = require('../model/user');
const uuid = require('uuid/v4');

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
async function createUser(firstName, lastName, password, phone, gender, email) {
  const id = uuid();
  const user = new User({
    id,
    firstName,
    lastName,
    password,
    phone,
    gender,
    email,
  });
  const result = await user.save();
  if (!result) return 'mail already used';
  return result;
}

/**
 * @description get user by ID
 * @author "mark bashir"
 * @date 2019-08-08
 * @param {string} id
 * @returns user details or user not found if ID wrong
 */
// async function getUser(id) {
//   const result = await User.findOne({ id }).select({
//     firstName: 1,
//     lastName: 1,
//     gender: 1,
//     email: 1,
//     phone: 1,
//     imageUrl: 1,
//     services: 1,
//   });
//   if (!result) {
//     return 'account not found';
//   }
//   return result;
// }

/**
 * @description function to update user details
 * @author "mark bashir"
 * @date 2019-08-09
 * @param {*} mail
 * @param {*} password
 * @param {*} details
 * @returns
 */
async function updateUser(email, password, details) {
  const result = await User.findOneAndUpdate(
    {
      email,
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
    { $match: { id: id } },
    { $project: { password: 0, __v: 0, email: 0 } },
    { $unwind: '$services' },
    { $match: { 'services.published': true } },
  ]);
  if (!result) {
    return 'no user found wrong id';
  }
  return result;
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
    { $project: { 'services.published': true, password: 0, __v: 0 } },
  ]);
  return users;
}
async function createService(
  email,
  role,
  serviceTitle,
  category,
  description,
  published = false,
) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await User.findOne({ email });
      if (result === null) throw new Error('user not found');

      let { services, firstName, lastName } = result;

      if (services.length >= 5) {
        throw new Error('can not have more than 5 services');
      } else {
        services.push({
          userName: `${firstName} ${lastName}`,
          role,
          serviceTitle,
          category,
          description,
          published,
        });
        user = await result.save();
        resolve(user.services);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}
function getAllServices() {
  return new Promise(async (resolve, reject) => {
    try {
      result = await User.aggregate([
        { $unwind: '$services' },
        { $project: { services: 1, _id: 0 } },
        { $match: { 'services.published': true } },
      ]);

      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
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

let user = getSingleUser('5d441be4ab9fe2b95c5f186b');
//  let user= createService("chiderahopewell@gmail.com","technical writing","Software service","all industries","offer software development services",true)
// module.exports={createUser,getUser,getAllUsers,updateUser,updatePassword,createService};
// user=createUser('chidera','stephen','zinachi','08130302988','female','chiderahopewell@gmail.com');
user
  .then(data => {
    console.log(data);
  })
  .catch(data => {
    console.log(data);
  });
