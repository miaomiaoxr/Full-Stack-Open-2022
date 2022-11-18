const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422adawd',
      title: 'Go To Statement Considered Harmful',
      author: 'Ivan',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Ivan',
      likes: 10
    })
  })
})

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422adawd',
      title: 'Go To Statement Considered Harmful',
      author: 'Ivan',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: 'safasfasfas',
      title: 'ssuiqeqe',
      author: 'Ivan',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/ssuiqeqe.html',
      likes: 1,
      __v: 0
    },
  ]

  test('find author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)

    expect(result).toEqual({
      author: 'Ivan',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422adawd',
      title: 'Go To Statement Considered Harmful',
      author: 'Ivan',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: 'safasfasfas',
      title: 'ssuiqeqe',
      author: 'Ivan',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/ssuiqeqe.html',
      likes: 1,
      __v: 0
    },
  ]

  test('find author with most likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)

    expect(result).toEqual({
      author: 'Ivan',
      likes: 11
    })
  })
})