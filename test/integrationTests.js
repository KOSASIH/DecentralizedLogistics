const app = require('../server');
const request = require('supertest')(app);

describe('Integration Tests: Server', () => {
    it('responds with a 404 for invalid routes', async () => {
        const response = await request.get('/invalid_route');
        expect(response.statusCode).toBe(404);
    });

    it('responds with welcome message at root path', async () => {
        const response = await request.get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Welcome to DecentralizedLogistics!');
    });

    it('responds with welcome message for GET /welcome', async () => {
        const response = await request.get('/welcome');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Welcome to DecentralizedLogistics!');
    });

    it('responds with JSON for POST /api/shipments', async () => {
        const response = await request.post('/api/shipments')
            .send({
                "sender": "John Doe",
                "receiver": "Jane Doe",
                "origin": "San Francisco, CA",
                "destination": "New York, NY",
                "goods": [
                    {
                        "description": "T-Shirts",
                        "quantity": 50
                    }
                ],
                "shipping_date": "2022-12-12T12:00:00Z",
                "delivery_date": "2022-12-15T12:00:00Z"
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(201);
        expect(typeof response.body).toEqual('object');
    });

    it('responds with JSON for GET /api/shipments', async () => {
        const response = await request.get('/api/shipments')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('responds with JSON for GET /api/shipments/:id', async () => {
        const response = await request.get('/api/shipments/1')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toEqual('object');
        expect(response.body.id).toBeDefined();
        expect(response.body.sender).toEqual('John Doe');
    });

    it('responds with JSON for PUT /api/shipments/:id', async () => {
        const response = await request.put('/api/shipments/1')
            .send({
                "receiver": "Jane Doe",
                "status": "completed"
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toEqual('object');
        expect(response.body.id).toBeDefined();
        expect(response.body.receiver).toEqual('Jane Doe');
        expect(response.body.status).toEqual('completed');
    });

    it('responds with JSON for DELETE /api/shipments/:id', async () => {
        const response = await request.delete('/api/shipments/1')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Shipment deleted successfully');
    });

});
