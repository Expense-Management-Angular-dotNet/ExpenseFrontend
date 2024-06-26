import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot,RouterStateSnapshot,  Router } from '@angular/router';
import { AuthService } from '../app/Services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot ) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const expectedrole = route.data['Role'];
  if(expectedrole == authService.getUserRole()){
    return true;
  } else {
    // router.navigate(['/unauthorized']);
    return false;
  }
};
