import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

  isFetching = signal<boolean>(false);

  placesService = inject(PlacesService);

  destroyRef = inject(DestroyRef);

  error = signal<string>('');

  places = this.placesService.loadedUserPlaces;


  ngOnInit(): void {
    this.isFetching.set(true);
    const subscribe = this.placesService.loadUserPlaces().subscribe({
      error: (error: Error) => {
        console.error(error);
        this.isFetching.set(false);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

  onRemoveUserPlace(place: Place) {
    const subscribe = this.placesService.removeUserPlace(place)
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error: Error) => {
          console.error(error);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

}
