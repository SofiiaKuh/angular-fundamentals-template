import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Make sure to import environment
import { SessionStorageService } from './session-storage.service'; // Assuming you have a sessionStorage service
import { Router } from '@angular/router'; // If you need to redirect after login/logout
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/auth`; // API URL for authentication
    private isAuthorized$$ = new BehaviorSubject<boolean>(false); // BehaviorSubject for authorization state
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable(); // Expose as an observable

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private router: Router
    ) {
        // Check if token exists in session storage and update authorization state
        if (this.sessionStorageService.getToken()) {
            this.isAuthorized$$.next(true); // User is authorized if token exists
        }
    }

    // Login method to authenticate user
    login(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user).pipe(
            tap((response: any) => {
                const token = response.token; // Assuming the token is in the response
                this.setToken(token);
            })
        );
    }

    // Logout method to clear user session and redirect to login page
    logout(): void {
        this.sessionStorageService.deleteToken(); // Remove token from session storage
        this.isAuthorized$$.next(false); // Update authorization state
        this.router.navigate(['/login']); // Redirect to login page
    }

    // Register method to create a new user
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    // Getter for isAuthorized (returns current authorization state)
    get isAuthorised(): boolean {
        return this.isAuthorized$$.getValue(); // Get current value of isAuthorized$$
    }

    // Setter for isAuthorized (sets authorization state)
    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value); // Set value of isAuthorized$$
    }

    // Get the login URL (can be useful for redirection or generating login page URL)
    getLoginUrl(): string {
        return `${this.apiUrl}/login`; // URL for the login API endpoint
    }

    // Private method to set token in session storage and update authorization state
    private setToken(token: string): void {
        this.sessionStorageService.setToken(token); // Store token in session storage
        this.isAuthorized$$.next(true); // Update authorization state to true
    }
}
