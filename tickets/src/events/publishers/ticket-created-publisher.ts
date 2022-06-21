import { Publisher, Subjects, TicketCreatedEvent } from '@lht-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
};

