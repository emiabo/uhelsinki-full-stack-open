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

describe('post a new blog', () => {
    const newBlog = {
        title: "This One's New",
	    author: "novella",
	    url: "https://outer.space",
	    likes: 39
    }

    test('total increases by one', async () => {
        const testPost = await api.post('/api/blogs').send(newBlog)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })

    test('correct data was returned from post (should be saved)', async () => {
        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.title).toBe(newBlog.title)
        expect(response.body.author).toBe(newBlog.author)
        expect(response.body.url).toBe(newBlog.url)
        expect(response.body.likes).toBe(newBlog.likes)
    })

    test('if missing likes: likes = 0', async () => {
        delete newBlog.likes // this affects all tests using newBlog after this point. consider just defining a new test object
        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.likes).toBe(0)
    })

    test('if missing title or url: status code 400', async () => {
        console.log(newBlog)
        delete newBlog.title
        delete newBlog.url
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})