import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  data = input.required<Ticket>();

  detailVisible = signal<boolean>(false);

  onClose = output();

  onDetailToggle() {
    // this.detailVisible.set(!this.detailVisible());
    this.detailVisible.update(v => !v);
  }

  onMarkClosed() {
    this.onClose.emit();
  }
}
