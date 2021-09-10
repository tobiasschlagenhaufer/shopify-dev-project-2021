const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');

const uploadImage = catchAsync(async (req, res) => {
  console.log(req.file);
  console.log(req.user);
  const image = await imageService.uploadImage(req.body, req.file, req.user);
  res.status(httpStatus.CREATED).send(image);
});

const getImages = catchAsync(async (req, res) => {
  const result = await imageService.queryImages();
  res.send(result);
});

const getImage = catchAsync(async (req, res) => {
  const image = await imageService.getImageById(req.params.imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  res.send(image);
});

const updateImage = catchAsync(async (req, res) => {
  const image = await imageService.updateImageById(req.params.imageId, req.body);
  res.send(image);
});

const deleteImage = catchAsync(async (req, res) => {
  await imageService.deleteImageById(req.params.imageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  uploadImage,
  getImages,
  getImage,
  updateImage,
  deleteImage,
};
