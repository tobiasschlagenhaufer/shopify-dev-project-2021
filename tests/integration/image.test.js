const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Image, User } = require('../../src/models');
const { imageSmall, imageBig, imageTwo, insertImages } = require('../fixtures/image.fixture');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Image routes', () => {
  describe('POST /images', () => {
    let newImage;

    beforeEach(() => {
      newImage = {
        name: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
      };
    });

    jest.setTimeout(15000)

    test('should return 201 and successfully create new image if data is ok', async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post('/images')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .field('name', newImage.name)
        .field('desc', newImage.desc)
        .attach('file', imageSmall.img.data, 'smallimg.png')
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newImage.name,
        desc: newImage.desc,
        img: {
          contentType: "image/png",
          data:  {
            data: [...imageSmall.img.data],
            type: "Buffer",
          },
        },
        user: admin._id.toHexString()
      });

      const dbImage = await Image.findById(res.body.id);
      expect(dbImage).toBeDefined();
      expect(dbImage).toMatchObject(newImage);
    });

    test('should return 400 and as image is too big', async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post('/images')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .field('name', newImage.name)
        .field('desc', newImage.desc)
        .attach('file', imageBig.img.data, 'smallimg.png')
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 unauthorized if not signed in', async () => {

      const res = await request(app)
        .post('/images')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .field('name', newImage.name)
        .field('desc', newImage.desc)
        .attach('file', imageSmall.img.data, 'smallimg.png')
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /images', () => {
    test('should return 200 and return all images', async () => {
      await insertImages([imageSmall]);
      await insertUsers([admin]);

      const res = await request(app)
        .get('/images')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
    });
  });
});
