const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
var path = require('path');

/**
 * Create an image
 * @param {Object} imageBody
 * @returns {Promise<Image>}
 */
const uploadImage = async (imageBody, file, user) => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not logged in');
  }
  imageBody.img = {
    data: fs.readFileSync(path.join('./uploads/' + file.filename)),
    contentType: 'image/png'
  }
  console.log("made it")
  imageBody.user = user._id;
  return Image.create(imageBody);
};

/**
 * Query for images
 * @returns {Promise<QueryResult>}
 */
const queryImages = async () => {
  const images = await Image.find();
  const results = {
    "results": images,
    "totalResults": images.length,
  }
  return results;
};

/**
 * Get image by id
 * @param {ObjectId} id
 * @returns {Promise<Image>}
 */
const getImageById = async (id) => {
  return Image.findById(id);
};

/**
 * Get image by name
 * @param {string} name
 * @returns {Promise<Image>}
 */
const getImageByName = async (name) => {
  return Image.findOne({ name });
};

/**
 * Update image by id
 * @param {ObjectId} imageId
 * @param {Object} updateBody
 * @returns {Promise<Image>}
 */
const updateImageById = async (imageId, updateBody) => {
  const image = await getImageById(imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  Object.assign(image, updateBody);
  await image.save();
  return image;
};

/**
 * Delete image by id
 * @param {ObjectId} imageId
 * @returns {Promise<Image>}
 */
const deleteImageById = async (imageId) => {
  const image = await getImageById(imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  await image.remove();
  return image;
};

module.exports = {
  uploadImage,
  queryImages,
  getImageById,
  getImageByName,
  updateImageById,
  deleteImageById,
};
