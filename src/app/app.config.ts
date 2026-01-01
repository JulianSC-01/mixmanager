import { ApplicationConfig } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { environment } from "src/environments/environment";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp(
        environment.firebaseConfig)),
    provideAuth(() =>
      getAuth()),
    provideFirestore(() =>
      getFirestore()),
    provideRouter(appRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules))
  ]
}