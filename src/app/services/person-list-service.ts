import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonResponse } from '../models/person-list-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonListService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  getPersons(): Observable<PersonResponse[]> {
    return this.http.get<PersonResponse[]>(this.apiUrl);
  }

  getPersonById(id: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.apiUrl}/${id}`);
  }
}
