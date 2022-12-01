const User = require('../models/user')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  const user = await User.findOne()
  //first user own all blogs

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async(request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  
  response.status(204).end()
})

blogsRouter.put('/:id', async(request,response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true})

  response.json(result)
})


module.exports = blogsRouter