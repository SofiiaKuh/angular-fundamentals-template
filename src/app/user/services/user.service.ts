import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = 'https://your-api-url.com'; // Replace with your backend URL

    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user/profile`); 
    }
}
