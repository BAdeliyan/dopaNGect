// ============================================
// فایل تغییر کرده: اصلاح متد getAvatar و اضافه کردن trackBy
// تغییرات:
// - خط 78: اصلاح getAvatar برای پشتیبانی از PersonResponse
// - خط 91-94: اضافه کردن trackByFn برای بهینه‌سازی
// ============================================

import { Component, inject, signal, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person-service';
import { PersonResponse } from '../models/person-list-model';
import { Gender, City, cityList } from '../models/person-model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonListComponent implements OnInit {
  // ========== Injections ==========
  private readonly personService = inject(PersonService);
  private readonly destroyRef = inject(DestroyRef);

  // ========== State Signals ==========
  persons = signal<PersonResponse[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  selectedPerson = signal<PersonResponse | null>(null);

  // ========== Selection State ==========
  selectedIds = signal<Set<string>>(new Set());
  isAllSelected = signal(false);

  // ========== Constants ==========
  readonly Gender = Gender;
  readonly City = City;
  readonly cityList = cityList;

  // ========== Lifecycle ==========
  ngOnInit(): void {
    this.loadPersons();
  }

  // ========== Load Data ==========
  loadPersons(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.resetSelection();

    this.personService
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

  // ========== Selection Methods ==========
  private resetSelection(): void {
    this.selectedIds.set(new Set());
    this.isAllSelected.set(false);
  }

  toggleSelection(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentIds = new Set(this.selectedIds());

    if (checked) {
      currentIds.add(id);
    } else {
      currentIds.delete(id);
    }

    this.selectedIds.set(currentIds);
    this.updateAllSelectedState();
  }

  toggleAllSelection(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.isAllSelected.set(checked);

    if (checked) {
      const allIds = new Set(this.persons().map((p) => p.id));
      this.selectedIds.set(allIds);
    } else {
      this.selectedIds.set(new Set());
    }
  }

  private updateAllSelectedState(): void {
    const total = this.persons().length;
    const selected = this.selectedIds().size;
    this.isAllSelected.set(total > 0 && selected === total);
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  // ========== Delete Methods ==========
  deleteSelected(): void {
    const selectedCount = this.selectedIds().size;

    if (selectedCount === 0) {
      alert('لطفاً حداقل یک کاربر را انتخاب کنید');
      return;
    }

    if (!confirm(`آیا از حذف ${selectedCount} کاربر انتخاب شده مطمئن هستید؟`)) {
      return;
    }

    this.isLoading.set(true);
    const ids = Array.from(this.selectedIds());
    let deletedCount = 0;

    ids.forEach((id) => {
      this.personService
        .deletePerson(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            deletedCount++;
            if (deletedCount === ids.length) {
              this.loadPersons();
              alert(`${deletedCount} کاربر با موفقیت حذف شدند`);
            }
          },
          error: (error) => {
            console.error('خطا در حذف:', error);
            this.isLoading.set(false);
            alert('خطا در حذف برخی کاربران');
          },
        });
    });
  }

  deletePerson(id: string): void {
    if (!confirm('آیا از حذف این کاربر مطمئن هستید؟')) return;

    this.isLoading.set(true);
    this.personService
      .deletePerson(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadPersons();
          alert('کاربر با موفقیت حذف شد');
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('خطا در حذف:', error);
          alert('خطا در حذف کاربر');
        },
      });
  }

  // ========== Avatar Helper (FIXED) ==========
  // CHANGE: دریافت عکس از localStorage با کلید
  getAvatar(person: PersonResponse | null | undefined): string | null {
    if (!person) return null;
    if (!person.avatar) return null;

    // avatar خودش کلید ذخیره شده در localStorage است
    const imageData = localStorage.getItem(person.avatar);
    if (!imageData) return null;

    return imageData;
  }

  // ========== View Details ==========
  viewPerson(person: PersonResponse): void {
    this.selectedPerson.set(person);
  }

  closeModal(): void {
    this.selectedPerson.set(null);
  }

  refresh(): void {
    this.loadPersons();
  }

  // ========== TrackBy for Performance ==========
  trackById(index: number, person: PersonResponse): string {
    return person.id;
  }
}
