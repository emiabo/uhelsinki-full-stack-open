const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "abcdefghijklmnop",
	    author: "qrstuvwxyz",
	    url: "https://alpha.bet",
	    likes: 26
    },
    {
        title: "the numbers blog",
	    author: "imaginary",
	    url: "https://numero.dos",
	    likes: 81
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})  
    let blogObject = new Blog(initialBlogs[0])  
    await blogObject.save()  
    blogObject = new Blog(initialBlogs[1])  
    await blogObject.save()
})

describe('get all blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('correct amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('items have id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})