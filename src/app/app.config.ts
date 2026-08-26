// ============================================
// فایل تغییر کرده: بدون تغییر (قبلاً HttpClient اضافه شده بود)
// ============================================

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), // قبلاً اضافه شده بود
  ],
};
