import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import auth from '../config/auth';
import StringUtils from '../utils/string.utils';

@Injectable({
    providedIn: 'root'
})
export class CustomHttp {

    constructor(private http: HttpClient) {}

    getHeader(): HttpHeaders {
        const headers = StringUtils.hasText(sessionStorage.getItem(auth.sessionName))
            ? new HttpHeaders().set(auth.sessionName, sessionStorage.getItem(auth.sessionName))
            : new HttpHeaders();
        return headers;
    }

    get(url, params): Observable<any> {
        return this.http.get(url, {
            params,
            headers: this.getHeader()
        });
    }

    post(url, params): Observable<any> {
        return this.http.post(url, null, {
            params,
            headers: this.getHeader()
        });
    }
}
