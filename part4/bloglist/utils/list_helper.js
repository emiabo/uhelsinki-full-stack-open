const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const addUp = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(addUp, 0)
}

module.exports = {
  dummy,
  totalLikes
}