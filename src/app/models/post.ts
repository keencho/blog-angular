export interface Post {
    _id?: string;
    created?: Date;
    isCreate?: boolean;
    tags: string[];
    path: string;
    show: boolean;
    title: string;
    summary: string;
    contents: string;
    thumbnail: string;
}

export interface PostListData {
    count: number;
    rows: Post[];
}
