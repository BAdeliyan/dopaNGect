// ============================================
// فایل تغییر کرده: اضافه شدن avatar به PersonResponse
// تغییرات: خط 7: اضافه شدن avatar?: string
// ============================================

import { PersonModel } from './person-model';

// توسعه PersonModel با اضافه کردن id و createdAt و avatar
export interface PersonResponse extends PersonModel {
  id: string; // شناسه یکتا از سرور
  createdAt?: string; // تاریخ ثبت در سرور
  avatar?: string; // NEW: کلید عکس در localStorage
}
