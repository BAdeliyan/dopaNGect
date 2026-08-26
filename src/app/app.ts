import { Component, signal } from '@angular/core';
import { RegisterPerson } from './person-register/person-register';
import { PersonList } from './person-list/person-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterPerson, PersonList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('template-driven-form');
}
