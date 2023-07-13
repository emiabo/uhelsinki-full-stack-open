const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const addUp = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(addUp, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...blogLikes)
  return blogs.find(blog => blog.likes === mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}