import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/orders';
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  return ticket;
}

it('fetches orders for a particular user', async () => {
  // create three tickets
  const ticketOne = buildTicket();
  const ticketTwo = buildTicket();
  const ticketThree = buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();
  // create one order as user #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: (await ticketOne).id })
    .expect(201);
  // create two orders as user #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: (await ticketTwo).id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: (await ticketThree).id })
    .expect(201);
  // make request to get orders from User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);
    expect(response.body[0].id).toEqual(orderOne.id);
    expect(response.body[1].id).toEqual(orderTwo.id);
    expect(response.body[0].ticket.id).toEqual((await ticketTwo).id);
    expect(response.body[1].ticket.id).toEqual((await ticketThree).id);
});
