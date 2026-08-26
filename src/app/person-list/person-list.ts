import { Component, inject, signal, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PersonListService } from '../services/person-list-service';
import { PersonResponse } from '../models/person-list-model';
import { Gender, City, cityList } from '../models/person-model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonList implements OnInit {
  private readonly personListService = inject(PersonListService);
  private readonly destroyRef = inject(DestroyRef);

  persons = signal<PersonResponse[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  selectedPerson = signal<PersonResponse | null>(null);

  readonly Gender = Gender;
  readonly City = City;
  readonly cityList = cityList;

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.personListService
      .getPersons()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.persons.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set('خطا در دریافت اطلاعات');
          console.error('Error loading persons:', error);
        },
      });
  }

  viewPerson(person: PersonResponse): void {
    this.selectedPerson.set(person);
  }

  closeModal(): void {
    this.selectedPerson.set(null);
  }

  refresh(): void {
    this.loadPersons();
  }
}
