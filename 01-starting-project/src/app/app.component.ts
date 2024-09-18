import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TrafficComponent } from './traffic/traffic.component';
import { ServerStatusComponent } from './server-status/server-status.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';
import { TicketsComponent } from './tickets/tickets.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, TicketsComponent, TrafficComponent, ServerStatusComponent, DashboardItemComponent,],
})
export class AppComponent {

}