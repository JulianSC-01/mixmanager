import { ApplicationConfig } from "@angular/core";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";
import { environment } from "src/environments/environment";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
    provideRouter(
      appRoutes, withPreloading(PreloadAllModules))
  ]
}