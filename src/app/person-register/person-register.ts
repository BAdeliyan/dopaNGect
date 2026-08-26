import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PersonModel, emptyPerson, cityList, Gender } from '../models/person-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person-register.html',
  styleUrl: './person-register.scss',
})
export class RegisterPerson {
  private readonly http = inject(HttpClient);

  personForm: PersonModel = { ...emptyPerson };
  readonly cityList = cityList;
  readonly Gender = Gender;

  // متد آپلود عکس
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.personForm.avatar = reader.result as string; // Base64
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const apiUrl = `${environment.apiUrl}/users`;

    this.http.post<PersonModel>(apiUrl, this.personForm).subscribe({
      next: (response) => {
        console.log('✅ پاسخ از سرور:', response);
        alert('ثبت نام با موفقیت انجام شد!');
        this.resetForm();
      },
      error: (error) => {
        console.error('❌ خطا:', error);
        alert('خطایی رخ داده است. لطفاً مجدداً تلاش کنید.');
      },
    });
  }

  private resetForm(): void {
    this.personForm = { ...emptyPerson };
  }
}
