import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import auth from '../config/auth';
import StringUtils from '../utils/string.utils';
import {CustomHttp} from './custom.http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private customHttp: CustomHttp,
    ) { }

    loginUrl = '/api/v1/auth/login';
    authenticationUrl = '/api/v1/auth/authentication';

    login(params): Observable<ApiResult<any>> {
        return this.customHttp.post(this.loginUrl, params);
    }

    authentication(): Observable<ApiResult<any>> {
        return this.customHttp.post(this.authenticationUrl, null);
    }

    chkTokenExists(): boolean {
        return StringUtils.hasText(sessionStorage.getItem(auth.sessionName));
    }
}
