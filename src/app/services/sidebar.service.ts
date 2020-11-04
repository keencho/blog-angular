import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import {Sidebar} from '../models/sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private http: HttpClient) { }

  sidebarDataUrl = '/api/v1/sidebar/getData';

  getSidebarData(): Observable<ApiResult<Sidebar>> {
    return this.http.get<ApiResult<Sidebar>>(this.sidebarDataUrl);
  }
}
