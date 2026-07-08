const request = require('supertest');
const app = require('./app');

describe('Sales Service', () => {
  it('should return list of sales', async () => {
    const res = await request(app).get('/sales');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('sales');
    expect(res.body.sales.length).toBeGreaterThan(0);
    expect(res.body.sales[0]).toHaveProperty('itemName');
  });

  it('should register a new sale', async () => {
    const res = await request(app)
      .post('/sales')
      .send({ itemName: 'Headphones', amount: 120 });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Sale recorded successfully');
    expect(res.body.sale).toHaveProperty('itemName', 'Headphones');
    expect(res.body.sale).toHaveProperty('amount', 120);
  });

  it('should reject sale without itemName or amount', async () => {
    const res = await request(app)
      .post('/sales')
      .send({ itemName: 'Headphones' });
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
