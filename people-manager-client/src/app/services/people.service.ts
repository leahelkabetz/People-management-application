import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeopleService {
    private baseUrl = `${environment.apiBaseUrl}/People`;
    constructor(private http: HttpClient) { }

    getAll(): Observable<Person[]> {
        return this.http.get<Person[]>(this.baseUrl);
    }
    add(person: Omit<Person, 'id'>): Observable<Person> {
        return this.http.post<Person>(this.baseUrl, person);
    }

    delete(id: number): Observable<void> {
        return this.http
            .delete(`${this.baseUrl}/${id}`, { responseType: 'text' })
            .pipe(map(() => void 0));
    }
    update(id: number, dto: Person): Observable<void> {
        return this.http
            .put(`${this.baseUrl}/${id}`, dto, { responseType: 'text' })
            .pipe(map(() => void 0));
    }



}
