import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "ring-of-fire-c01d1",
      "appId": "1:91450385227:web:dd95d74964624f368afece",
      "storageBucket": "ring-of-fire-c01d1.firebasestorage.app",
      "apiKey": "AIzaSyD0PcPLrDXW-M-0GU8Y7hzHYuw2aba6cv8",
      "authDomain": "ring-of-fire-c01d1.firebaseapp.com",
      "messagingSenderId": "91450385227"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())]
};
