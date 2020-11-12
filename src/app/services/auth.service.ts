import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    loginUrl = '/api/v1/auth/login';

    login(param): Observable<ApiResult<any>> {
        return this.http.post<ApiResult<any>> (
            this.loginUrl,
            null,
            { params: param }
        );
    }
}
