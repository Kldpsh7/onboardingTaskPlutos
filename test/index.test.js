const supertest = require('supertest');
const {app} = require('../App');

test('getHomepage', async() => {
    const res = await supertest(app).get('/')
    expect(res.statusCode).toBe(200)
})

test('getCustomers',async() => {
    const res = await supertest(app).get('/customers')
    expect(res.statusCode).toBe(200)
    expect(res.body)
    expect(typeof res.body === "array")
})

test('getVouchers',async() => {
    const res = await supertest(app).get('/vouchers')
    expect(res.statusCode).toBe(200)
    expect(res.body)
    expect(typeof res.body === "array")
})

test('getVouchersById',async() => {
    const res = await supertest(app).get('/vouchers?id=1')
    expect(res.statusCode).toBe(200)
    expect(res.body)
    expect(typeof res.body === "array")
})

test('getVouchersByType',async() => {
    const res = await supertest(app).get('/vouchers?type=food')
    expect(res.statusCode).toBe(200)
    expect(res.body)
    expect(typeof res.body === "array")
})

test('getVouchersByFalseId',async() => {
    const res = await supertest(app).get('/voucher?id=0')
    expect(res.statusCode).toBe(404)
    expect(res.body)
    expect(typeof res.body === "object")
})

test('getVouchersByFalseType',async() => {
    const res = await supertest(app).get('/voucher?type=xyz')
    expect(res.statusCode).toBe(404)
    expect(res.body)
    expect(typeof res.body === "object")
})

test('customerLogin',async() => {
    const res = await supertest(app).post('/customer/login').send({
        email:'kuldeep@gmail',
        password:'123'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body)
    expect(typeof res.body === "object")
    expect(res.body.token)
})

test('customerLoginWrongUser',async() => {
    const res = await supertest(app).post('/customer/login').send({
        email:'xyz',
        password:'123'
    })
    expect(res.statusCode).toBe(404)
    expect(res.body)
    expect(typeof res.body === "object")
    expect(res.body.message)
})

test('customerLoginWrongPassword',async() => {
    const res = await supertest(app).post('/customer/login').send({
        email:'kuldeep@gmail',
        password:'000'
    })
    expect(res.statusCode).toBe(401)
    expect(res.body)
    expect(typeof res.body === "object")
    expect(res.body.message)
})