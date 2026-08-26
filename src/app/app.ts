// ============================================
// فایل تغییر کرده: اضافه شدن PersonListComponent به imports
// تغییرات:
// - خط 5: اضافه شدن import PersonListComponent
// - خط 11: اضافه شدن PersonListComponent به imports
// ============================================

import { Component, signal } from '@angular/core';
import { RegisterPerson } from './person-register/person-register';
import { PersonListComponent } from './person-list/person-list'; // NEW

@Component({
  selector: 'app-root',
  standalone: true,
  // CHANGE: PersonListComponent اضافه شد
  imports: [RegisterPerson, PersonListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('template-driven-form');
}
