import {Paging} from './paging';

interface Post {
    _id: string;
    created: Date;
    tag: string;
    path: string;
    show: boolean;
    title: string;
    summary: string;
    contents: string;
    regexContents: string;
    thumbnail: string;
}

export interface PostList {
    paging: Paging;
    rows: [Post];
}
