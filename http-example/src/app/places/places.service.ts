import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  errorService = inject(ErrorService);

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Could not fetch places.');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Could not fetch user places.')
      .pipe(tap(places => this.userPlaces.set(places)),);
  }

  addPlaceToUserPlaces(place: Place) {
    const previousPlaces = this.userPlaces();
    if (!previousPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set([...previousPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id }).pipe(catchError(error => {
      this.userPlaces.set(previousPlaces);
      this.errorService.showError('Could not add place to user places.');
      throw new Error('Could not add place to user places.');
    },),);
  }

  removeUserPlace(place: Place) {
    const previousPlaces = this.userPlaces();

    if (previousPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set(previousPlaces.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(catchError(error => {
      this.userPlaces.set(previousPlaces);
      this.errorService.showError('Could not remove place from user places.');
      throw new Error('Could not remove place from user places.');
    },),);
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(map(responseData => responseData.places), catchError(error => { throw new Error(errorMessage); },),);
  }
}
