import { CanActivateFn, Router } from '@angular/router';
import { booleanAttribute, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let canActivate = false;
  authService.user.pipe(take(1)).subscribe((user) => (canActivate = user !== null));
  if (!canActivate) {
    router.navigate(['/login']);
  }
  return canActivate;
};
