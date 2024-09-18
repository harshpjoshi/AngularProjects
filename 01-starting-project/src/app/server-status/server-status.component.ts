import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');

  private interval?: ReturnType<typeof setInterval>;

  constructor() {

    effect(() => {
      console.log('Server status changed:', this.currentStatus());
    });

  }


  ngOnInit() {
    this.interval = setInterval(() => {
      const random = Math.random();

      if (random > 0.5) {
        this.currentStatus.set('online');
      } else if (random < 0.2) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }

    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
