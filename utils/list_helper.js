const User = require('../models/user')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  for (let blog of blogs) {
    total += blog.likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let favorite = blogs[0]
  for (let blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  }
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const dict = {}

  for (let blog of blogs) {
    if (dict[blog.author]) {
      dict[blog.author] += 1
    } else {
      dict[blog.author] = 1
    }
  }

  let most = { author: '', blogs: -1 }
  for (let author in dict) {
    if (dict[author] > most.blogs) {
      most = { author, blogs: dict[author] }
    }
  }

  return most
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const dict = {}

  for (let blog of blogs) {
    if (dict[blog.author])
      dict[blog.author] += blog.likes
    else
      dict[blog.author] = blog.likes
  }

  let most = { author: '', likes: -1 }
  for (let author in dict) {
    if (dict[author] > most.likes) {
      most = { author, likes: dict[author] }
    }
  }

  return most
}

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Ivan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  },
  {
    title: 'ssuiqeqe',
    author: 'Ivan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/ssuiqeqe.html',
    likes: 1,
  }
]

const postBlog = {
  title: 'qweqeasd',
  author: 'Omegle',
  url: 'http://www.u.arizona.edu/wweq.html',
  likes: 1,
}


const nolikeBlog = {
  title: 'No like',
  author: 'Unliked',
  url: 'http://www.no.like',
}

const noTitleBlog = {
  author: 'No title',
  url: 'http://www.no.title',
  likes: 1,
}

const noUrlBlog = {
  title: 'No url',
  author: 'No url',
  likes: 1,
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUser = {
  username: 'first',
  name: 'first',
  password: 'first',
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  postBlog,
  nolikeBlog,
  noTitleBlog,
  noUrlBlog,
  usersInDb,
  initialUser
}