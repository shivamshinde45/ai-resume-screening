
const request = require('supertest');
const app = require('../src/app');

test('upload', async ()=>{
  const res = await request(app)
    .post('/evaluate')
    .field('jobDescription','Node dev')
    .attach('resume', __filename);

  expect(res.statusCode).toBe(202);
});
