import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResult} from '../models/api-result';
import {Post, PostListData} from '../models/post';
import {limitDefault} from '../models/paging';
import {CustomHttp} from './custom.http.service';
import {Validation} from '../models/validation';
import StringUtils from '../utils/string.utils';
import {Archives} from '../models/archives';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private customHttp: CustomHttp) { }

  getUrl = '/api/v1/post/get';
  listUrl = '/api/v1/post/listInfiniteScroll';
  writeUrl = '/api/v1/post/write';
  deleteUrl = '/api/v1/post/delete';
  listArchivesUrl = '/api/v1/post/listArchives';

  getPost(params): Observable<ApiResult<Post>> {
    return this.customHttp.get(this.getUrl, params);
  }

  listPost(params): Observable<ApiResult<PostListData>> {
    params.limit = limitDefault;
    return this.customHttp.get(this.listUrl, params);
  }

  listArchives(): Observable<ApiResult<Archives[]>> {
    return this.customHttp.get(this.listArchivesUrl, null);
  }

  validatePost(post: Post): Validation {

    let success = true;
    let error: string;

    switch (true) {
      case !StringUtils.hasText(post.title):
        error = '제목';
        break;
      case post.tags.length < 1:
        error = '태그';
        break;
      case !StringUtils.hasText(post.path):
        error = '접근 경로';
        break;
      case !StringUtils.hasText(post.summary):
        error = '요약';
        break;
      case !StringUtils.hasText(post.contents):
        error = '컨텐츠';
        break;
    }

    if (StringUtils.hasText(error)) {
      success = false;
      error += '을(를) 입력하세요.';
    }

    const validation: Validation = {
      success,
      error
    };

    return validation;
  }

  writePost(post: Post): Observable<ApiResult<any>> {
    return this.customHttp.post(this.writeUrl, post);
  }

  deletePost(post: Post): Observable<ApiResult<any>> {
    return this.customHttp.post(this.deleteUrl, post);
  }
}
