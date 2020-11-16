import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import {Sidebar} from '../models/sidebar';
import {CustomHttp} from './custom.http.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private customHttp: CustomHttp) { }

  sidebarDataUrl = '/api/v1/sidebar/getData';

  getSidebarData(): Observable<ApiResult<Sidebar>> {
    return this.customHttp.get(this.sidebarDataUrl, null);
  }
}
