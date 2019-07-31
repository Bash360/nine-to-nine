const mongoose = require('mongoose');
serviceSchema = new mongoose.Schema({
  timeCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  userName: { type: String, maxlength: 100, required: true, trim: true },
  category: {
    type: String,
    maxlenght: 50,
    minlength: 20,
    required: true,
    trim: true,
    default: 'all category'
  },
  email: {
    type: String,
    maxlenght: 100,
    min: 5,
    required: true,
    trim: true,
    unique: true
  },
  role: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
    trim: true
  },
  serviceTitle: {
    type: String,
    maxlength: 20,
    minlength: 10,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200,
    minlength: 10,
    required: true,
    trim: true
  },
  published: {
    type: Boolean,
    enum: [true, false],
    default:false
  }
});
const userSchema = new mongoose.Schema({
  firstName: { type: String, maxlenght: 30, minlength: 2, required: true, trim: true },
  lastName: { type: String, maxlenght: 30, minlength: 2, required: true, trim: true },
  email: { type: String, maxlenght: 100, min: 5, required: true, trim: true, unique: true },
  phone: { type: String, maxlenght: 11, minlength: 11, required: true, trim: true },
  gender: { type: String, enum:['male','female'], required: true, trim: true },
  password: { type: String, maxlenght: 30, min: 5, required: true, trim: true },
  imageUrl: { type: String, maxlenght: 100, required: true, default: 'default.jpg', trim: true },
  services: { type: [serviceSchema] }
});

try {
  mongoose
    .connect('mongodb+srv://guest:password666@nine-to-nine-ew1gv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true })
    .then((res) => {
      console.log('connected to database');
    })
    .catch(error => {
      console.error(error.message);
    });
 
} catch (error) {
  console.error(error.message);
}

 
const User = mongoose.model('user', userSchema)
function createUser(firstName, lastName,password, phone, gender, email) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User({ firstName, lastName,password, phone, gender, email });
      const result = await user.save();
      resolve({ userID:result._id });
    } catch (error) {
      reject(error.message);
    }
  });
}
function getUser(email,password) { 
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({email,password }).select({
        firstName: 1,
        lastName: 1,
        gender: 1,
        email: 1,
        phone: 1,
        imageUrl:1
        
      });
      if (users.length === 0) { throw new Error('account not found') }
      resolve(users[0]);
      
    } catch (error) {
      reject(error);
    }
  });
}
function updateUser(mail,password, details) {
  return new Promise(async (resolve, reject) => {
    try {
      
        const result = await User.findOneAndUpdate(
          {
            email:mail,password
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

       let { firstName,lastName,phone,gender,email } = result;
      resolve({ firstName, lastName, phone, gender, email });
      
    } catch (error) {
      reject(error.message);
    }
  });
}
function updatePassword(email, password,newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findOneAndUpdate({ email, password },
        {
          $set: {
            password:newPassword
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
      const users = await User.find().select({
        firstName: 1,
        lastName: 1,
        gender: 1,
        email: 1,
        phone: 1,
        imageUrl: 1,
        _id:0

      });
      if (users.length === 0) { throw new Error('no users') }
      resolve(users[0]);

    } catch (error) {
      reject(error);
    }
  });
}
function createService(userName,email,role,serviceTitle,category,description,published=false,timeCreated) { 
  return new Promise(async(resolve, reject) => {
    try {
      let result = await User.findOneAndUpdate({ email },
        {
          $set: {
            services: [{ userName, email, role, serviceTitle, category, description, published, timeCreated}]
          }

        }, {
          new:true
        }
      );
      if (result === null) { 
        throw new Error('can not find user');
      }
      result();
      
    } catch (error) {
      reject(error.message);
    }
   });
}

  //  let user = getAllUsers();
  // user.then((data) => { console.log(data) }).catch((data) => { console.log(data) });
