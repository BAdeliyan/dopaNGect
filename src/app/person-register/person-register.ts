import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonModel, emptyPerson, cityList, Gender } from '../models/person-model';
import { PersonService } from '../services/person-service';

@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person-register.html',
  styleUrl: './person-register.scss',
})
export class RegisterPerson {
  private readonly personService = inject(PersonService);

  personForm: PersonModel = { ...emptyPerson };
  readonly cityList = cityList;
  readonly Gender = Gender;

  // NEW: Signal برای وضعیت بارگذاری
  isLoading = signal(false);
  avatarBase64: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.compressImage(file)
        .then((base64) => {
          this.avatarBase64 = base64;
          this.personForm.avatar = base64; // برای پیش‌نمایش
        })
        .catch((error) => {
          console.error('خطا در کمپرس عکس:', error);
          alert('خطا در پردازش عکس');
        });
    }
  }

  private compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxSize = 100;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/jpeg', 0.3);
          resolve(base64);
        };

        img.onerror = reject;
      };

      reader.onerror = reject;
    });
  }

  onSubmit(): void {
    let avatarKey = '';
    if (this.avatarBase64) {
      avatarKey = `avatar_${Date.now()}`;
      localStorage.setItem(avatarKey, this.avatarBase64);
    }

    const userData = {
      ...this.personForm,
      avatar: avatarKey,
    };

    this.isLoading.set(true);

    this.personService.createPerson(userData).subscribe({
      next: (response) => {
        console.log('✅ پاسخ از سرور:', response);
        alert('ثبت نام با موفقیت انجام شد!');
        this.isLoading.set(false);
        this.resetForm();
      },
      error: (error) => {
        console.error('❌ خطا:', error);
        this.isLoading.set(false);
        if (error.status === 413) {
          alert('حجم اطلاعات زیاد است! لطفاً عکس کوچکتری انتخاب کنید.');
        } else {
          alert('خطایی رخ داده است. لطفاً مجدداً تلاش کنید.');
        }
      },
    });
  }

  private resetForm(): void {
    this.personForm = { ...emptyPerson };
    this.avatarBase64 = null;

    const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
