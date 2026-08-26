// ============================================
// فایل جدید: سرویس مدیریت کاربران (CRUD)
// ============================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonResponse } from '../models/person-list-model';
import { PersonModel } from '../models/person-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  // دریافت همه کاربران
  getPersons(): Observable<PersonResponse[]> {
    return this.http.get<PersonResponse[]>(this.apiUrl);
  }

  // دریافت یک کاربر با id
  getPersonById(id: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.apiUrl}/${id}`);
  }

  // ثبت کاربر جدید
  createPerson(person: PersonModel): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(this.apiUrl, person);
  }

  // حذف یک کاربر
  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // به‌روزرسانی کاربر
  updatePerson(id: string, person: Partial<PersonModel>): Observable<PersonResponse> {
    return this.http.put<PersonResponse>(`${this.apiUrl}/${id}`, person);
  }
}
