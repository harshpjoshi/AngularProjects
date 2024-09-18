import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  isFetching = signal<boolean>(false);

  placesService = inject(PlacesService);

  destroyRef = inject(DestroyRef);

  error = signal<string>('');


  ngOnInit(): void {
    this.isFetching.set(true);
    const subscribe = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
        this.isFetching.set(false);
      },
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

  onSelectPlace(place: Place) {
    const subscribe = this.placesService.addPlaceToUserPlaces(place)
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
