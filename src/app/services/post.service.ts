import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import {Post} from '../models/post';
import {limitDefault} from '../models/paging';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  listUrl = '/api/v1/post/listInfiniteScroll';

  listPost(param): Observable<ApiResult<Post[]>> {
    param.limit = limitDefault;
    return this.http.get<ApiResult<Post[]>>(
        this.listUrl,
        { params: param }
      );
  }
}
