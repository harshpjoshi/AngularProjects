import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  tickets: Ticket[] = [];


  onAddTicket(ticketData: { title: string; description: string; }) {
    this.tickets.push({
      id: Math.random().toString(),
      title: ticketData.title,
      description: ticketData.description,
      status: 'open'
    });
  }

  onCloseTicket(ticketId: string) {

    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: 'closed' };
      }
      return ticket
    });

  }


}
