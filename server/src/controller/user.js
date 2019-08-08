const User = require('../model/user');

async function createUser(firstName, lastName, password, phone, gender, email) {
      const user = new User({ firstName, lastName, password, phone, gender, email });
      const result = await user.save();
  if (result) return result;
  return 'mail already used';
}
function getUserAccount(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email, password }).select({
        firstName: 1,
        lastName: 1,
        gender: 1,
        email: 1,
        phone: 1,
        imageUrl: 1,
        services:1

      });
      if (user===null) { throw new Error('account not found') }
      resolve(user);

    } catch (error) {
      reject(error);
    }
  });
}
function updateUser(mail, password, details) {
  return new Promise(async (resolve, reject) => {
    try {

      const result = await User.findOneAndUpdate(
        {
          email: mail, password
        },
        {
          $set:
            details

        },
        { new: true }
      );
      if (result === null) {
        throw new Error("incorrect details");
      }

      let { firstName, lastName, phone, gender, email } = result;
      resolve({ firstName, lastName, phone, gender, email });

    } catch (error) {
      reject(error.message);
    }
  });
}
function getSingleUser(userID){
  return new Promise(async(resolve,reject)=>{
    try {
      user=await User.aggregate([{$match:{'_id':mongoose.Types.ObjectId(userID)}},{$project:{'password':0,'__v':0,'email':0}},{$unwind:'$services'},{$match:{'services.published':true}}]);
    resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}
function updatePassword(email, password, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findOneAndUpdate({ email, password },
        {
          $set: {
            password: newPassword
          }

        });
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
      if (users.length === 0) { throw new Error('no users') }
      user=User.aggregate([{$sort:{'firstName':1,'lastName':1}},{$project:{'services':0,'password':0,'__v':0}}]);
      resolve(user);

    } catch (error) {
      reject(error);
    }
  });
}
function createService( email, role, serviceTitle, category, description, published = false) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await User.findOne({ email });
       if (result === null) throw new Error('user not found');
      
      let {services,firstName,lastName }=result;

      if (services.length >= 5) {
        throw new Error('can not have more than 5 services');
      } else { 
        services.push({ userName: `${firstName} ${lastName}`, role, serviceTitle, category, description, published });
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
      result = await User.aggregate([{$unwind:'$services'},{$project:{'services':1,_id:0}},{$match:{'services.published':true}}]);
     
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
   });
}
function publishService(email,serviceID) {
return new Promise(async(resolve,reject)=>{
try {
  // result = await User.findOne({email});
  // if(result===null){
  //   throw new Error('user not found');
  // }
  service= await User.aggregate([{$unwind:'$services'},{$project:{'services':1,_id:0}},{$match:{'services.published':false,'services._id':mongoose.Types.ObjectId(serviceID)}}]);
  if(service.length===0) throw new Error('service already published');
  resolve(service)
} catch (error) {
  reject(error.message);
}
});
}

let user = getSingleUser('5d441be4ab9fe2b95c5f186b');
//  let user= createService("chiderahopewell@gmail.com","technical writing","Software service","all industries","offer software development services",true)
// module.exports={createUser,getUser,getAllUsers,updateUser,updatePassword,createService};
// user=createUser('chidera','stephen','zinachi','08130302988','female','chiderahopewell@gmail.com');
  user.then((data) => { console.log(data) }).catch((data) => { console.log(data) });