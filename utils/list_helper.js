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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}