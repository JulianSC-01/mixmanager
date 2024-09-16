import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppLoginGuard } from './app-login-guard';

describe('AppLoginGuard', () => {
  let service: AppLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([])
      ]
    });
    service = TestBed.inject(AppLoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
