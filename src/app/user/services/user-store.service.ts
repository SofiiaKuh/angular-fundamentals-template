import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service'; // Import your UserService

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    // Private BehaviorSubject to store the admin status
    private isAdmin$$ = new BehaviorSubject<boolean>(false); // Default value: false

    // Public Observable to expose isAdmin state
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) { }

    // Fetch user data and update the isAdmin status
    getUser(): void {
        this.userService.getUser().subscribe({
            next: (user) => {
                this.setIsAdmin(user.result.isAdmin); // Call method to update state
            },
            error: () => {
                this.setIsAdmin(false); // Default to false in case of an error
            }
        });
    }

    // Method to update isAdmin state
    private setIsAdmin(value: boolean): void {
        this.isAdmin$$.next(value);
    }
}
