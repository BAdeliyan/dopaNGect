import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonRegister } from './person-register';

describe('PersonRegister', () => {
  let component: PersonRegister;
  let fixture: ComponentFixture<PersonRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
