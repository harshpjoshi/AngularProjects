import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ControlComponent } from "../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  @Output() ticketSubmitted = new EventEmitter<{ title: string; description: string; }>();

  onSubmit(title: string, description: string) {
    console.log('Ticket submitted');
    this.ticketSubmitted.emit({ title, description });
    this.form?.nativeElement.reset();
  }

}
