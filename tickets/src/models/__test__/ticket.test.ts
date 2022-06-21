import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {
  // create an instance of the ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123'
  });

  // save the ticket to the database
  await ticket.save();

  // fetch the ticket twice 
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two seperate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  // save the second fetch ticket and expect an error
  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version on multiple saves', async() => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123'
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});