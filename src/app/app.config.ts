import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { initializeApp } from "firebase/app";
import 'temporal-spec/global';
import { environment } from "../environments/environment";
import { appRoutes } from "./app.routes";

export const FIREBASE_APP =
  initializeApp(environment.firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules))
  ]
}