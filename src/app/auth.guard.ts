import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './shared/services/token.service';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.token$.subscribe((data: number) => {
    if (data != 0) {
      return true;
    } else {
      router.navigate(['front/login']);
      return false;
    }
  });

  return true;
};
