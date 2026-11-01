import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules))
  ]
}