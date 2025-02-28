import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
        if (this.authService.isAuthorised) {
            return of(true); // Wrap true in an observable
        } else {
            return of(this.router.parseUrl('/login')); // Wrap UrlTree in an observable
        }
    }
}
