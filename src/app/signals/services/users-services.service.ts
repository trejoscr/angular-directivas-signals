import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  private http = inject( HttpClient );
  private baseUrl = 'https://reqres.in/api/users';

  getUserById( id: number ): Observable<User> {
    return this.http.get<SingleUserResponse>( `${this.baseUrl}/${id}`)
    .pipe(
      map( response => response.data ),
      tap( console.log )
    );
  }

}
