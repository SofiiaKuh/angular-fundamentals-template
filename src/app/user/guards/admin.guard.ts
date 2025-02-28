import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private userStore: UserStoreService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return new Observable<boolean | UrlTree>((observer) => {
            this.userStore.isAdmin$.subscribe(isAdmin => {
                if (isAdmin) {
                    observer.next(true); // Allow access if the user is an admin
                } else {
                    observer.next(this.router.createUrlTree(['/courses'])); // Redirect to /courses if not an admin
                }
            });
        });
    }
}
