const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadImage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    desc: Joi.string().required(),
    userId: Joi.string().custom(objectId),
    img: Joi.object(),
  }),
};

const getImages = {
  query: Joi.object().keys({
    name: Joi.string(),
    desc: Joi.string(),
    img: Joi.object(),
    userId: Joi.string().custom(objectId),
  }),
};

const getImage = {
  params: Joi.object().keys({
    imageId: Joi.string().custom(objectId),
  }),
};

const updateImage = {
  params: Joi.object().keys({
    imageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      desc: Joi.string(),
      img: Joi.object(),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteImage = {
  params: Joi.object().keys({
    imageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  uploadImage,
  getImages,
  getImage,
  updateImage,
  deleteImage,
};
