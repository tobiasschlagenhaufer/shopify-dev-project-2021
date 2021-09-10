const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const Image = require('../../src/models/image.model');
const User = require('../../src/models/user.model');
const { userOne, admin } = require('./user.fixture')
const fs = require('fs');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const imageTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.sentence(),
  desc: faker.lorem.sentence(),
  img: {
    data: fs.readFileSync(__dirname + '/small-file'),
    contentType: 'image/png'
  },
  user: userOne._id.toString(),
}

const imageSmall = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.sentence(),
  desc: faker.lorem.sentence(),
  img: {
    data: fs.readFileSync(__dirname + '/small-file'),
    contentType: 'image/png'
  },
  user: userOne._id.toString(),
}

const imageBig = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.sentence(),
  desc: faker.lorem.sentence(),
  img: {
    data: fs.readFileSync(__dirname + '/big-file'),
    contentType: 'image/png'
  },
  user: admin._id.toString(),
}

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

const insertImages = async (images) => {
  await Image.insertMany(images);
}

module.exports = {
  userOne,
  imageSmall,
  imageBig,
  imageTwo,
  admin,
  insertUsers,
  insertImages,
};
