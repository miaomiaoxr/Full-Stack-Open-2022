const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

const api = supertest(app)

test('blogs return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned',async ()=>{
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  for(let blog of response.body){
    expect(blog.id).toBeDefined()
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const initBlogList = helper.initialBlogs.map(blog => new Blog(blog))
  const promises = initBlogList.map(blog => blog.save())
  await Promise.all(promises)
})

afterAll(() => {
  mongoose.connection.close()
})