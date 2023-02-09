/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { generRouter } = require('../../src/routes/movieRouter/generRouter');

describe('Test the GET /geners route', () => {
  test('It should return 200 status code and all the geners', async () => {
    const response = await request(generRouter).get('/');
    expect(response.statusCode).toBe(200);
    //expect(response.body).toEqual(/* los geners esperados */);
  });
});

// describe('Test the POST /geners route', () => {
//   test('It should return 200 status code and the new gener', async () => {
//     const response = await request(generRouter)
//       .post('/')
//       .send({ name: 'Adventure' });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(/* el gener esperado */);
//   });
// });