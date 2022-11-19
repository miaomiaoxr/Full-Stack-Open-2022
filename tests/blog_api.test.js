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

test('post is work',async () => {
  await api
    .post('/api/blogs')
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

test('post without likes',async () => {
  await api
    .post('/api/blogs')
    .send(helper.nolikeBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const blog = response.body.find(blog => blog.title === helper.nolikeBlog.title)
  expect(blog.likes).toBeDefined()
  expect(blog.likes).toBe(0)
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