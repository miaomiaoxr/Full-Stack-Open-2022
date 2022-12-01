const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/list_helper')

const api = supertest(app)
let token = ''

test('blogs return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('post is work', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(helper.postBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    helper.postBlog.title
  )
})

test('post without likes', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(helper.nolikeBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const blog = response.body.find(blog => blog.title === helper.nolikeBlog.title)
  expect(blog.likes).toBeDefined()
  expect(blog.likes).toBe(0)
})

test('post without title and url', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(helper.noUrlBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(helper.noTitleBlog)
    .expect(400)
})

test('delete work without token', async () => {
  const response = await api.get('/api/blogs')

  const delBlog = response.body[0]
  
  const res = await api.delete(`/api/blogs/${delBlog.id}`).expect(401)

  expect(res.body.error).toContain('Unauthorized')

})

test('delete works', async () => {
  const response = await api.get('/api/blogs')

  const delBlog = response.body[0]
  await api.delete(`/api/blogs/${delBlog.id}`).set('Authorization', 'Bearer ' + token).expect(204)

  const response2 = await api.get('/api/blogs')

  response2.body.map(blog => expect(blog.id).not.toBe(delBlog.id))
})

test('update likes', async () => {
  const response = await api.get('/api/blogs')

  const updateBlog = response.body[0]
  
  const newLikes = updateBlog.likes + 1

  const resBody = await api.put(`/api/blogs/${updateBlog.id}`).send({likes: newLikes}).expect(200)

  expect(resBody.body.likes).toBe(newLikes)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  //init user
  await api.post('/api/users').send(helper.initialUser)
  const res = await api.post('/api/login').send(helper.initialUser)
  token = res.body.token

  const promises = helper.initialBlogs.map(blog => api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(blog))
  await Promise.all(promises)
 
})

afterAll(() => {
  mongoose.connection.close()
})