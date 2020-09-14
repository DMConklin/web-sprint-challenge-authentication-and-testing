const supertest = require('supertest')
const server = require('../api/server')
const dbConfig = require('../database/dbConfig')

beforeAll(async () => {
    await dbConfig.seed.run()
})

afterAll(async () => {
    await dbConfig.destroy()
})

test('Get Jokes', async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.type).toBe("application/json")
    
    if (res.statusCode === 401) {
        expect(res.body.message).toBe('You shall not pass!')
    }
})

test('Post Register User', async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ 
            username: "Username6", 
            password: "Password"
        })
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
})

test('Post Login', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: "Username6",
            password: "Password"
        })
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
})