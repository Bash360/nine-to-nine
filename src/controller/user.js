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
  if (result) return result;
  return 'mail already used';
}

/**
 * @description get user by ID
 * @author "mark bashir"
 * @date 2019-08-08
 * @param {string} id
 * @returns user details or user not found if ID wrong
 */
async function getUser(id) {
  const result = await User.findOne({ id }).select({
    firstName: 1,
    lastName: 1,
    gender: 1,
    email: 1,
    phone: 1,
    imageUrl: 1,
    services: 1,
  });
  if (!result) {
    return 'account not found';
  }
  return result;
}

/**
 * @description
 * @author "mark bashir"
 * @date 2019-08-09
 * @param {*} mail
 * @param {*} password
 * @param {*} details
 * @returns
 */
function updateUser(mail, password, details) {
  return new Promise(async (resolve, reject) => {
    try {
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
      if (result === null) {
        throw new Error('incorrect details');
      }

      let { firstName, lastName, phone, gender, email } = result;
      resolve({ firstName, lastName, phone, gender, email });
    } catch (error) {
      reject(error.message);
    }
  });
}
function getSingleUser(userID) {
  return new Promise(async (resolve, reject) => {
    try {
      user = await User.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(userID) } },
        { $project: { password: 0, __v: 0, email: 0 } },
        { $unwind: '$services' },
        { $match: { 'services.published': true } },
      ]);
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}
function updatePassword(email, password, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findOneAndUpdate(
        { email, password },
        {
          $set: {
            password: newPassword,
          },
        },
      );
      if (result === null) {
        throw new Error('incorrect details');
      }
      resolve('password updated');
    } catch (error) {
      reject(error.message);
    }
  });
}
function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find().select();
      if (users.length === 0) {
        throw new Error('no users');
      }
      user = User.aggregate([
        { $sort: { firstName: 1, lastName: 1 } },
        { $project: { services: 0, password: 0, __v: 0 } },
      ]);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}
function createService(
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
