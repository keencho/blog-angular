import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import {PostListData} from '../models/post';
import {limitDefault} from '../models/paging';
import {CustomHttp} from './custom.http.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private customHttp: CustomHttp) { }

  listUrl = '/api/v1/post/listInfiniteScroll';

  listPost(params): Observable<ApiResult<PostListData>> {
    params.limit = limitDefault;
    return this.customHttp.get(this.listUrl, params);
  }
}
