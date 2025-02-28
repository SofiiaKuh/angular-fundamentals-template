import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
        return this.authService.isAuthorised ? true : this.router.createUrlTree(['/login']);
    }
}
