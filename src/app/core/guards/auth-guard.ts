import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('token') && localStorage.getItem('user')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
