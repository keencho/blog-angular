export interface ApiResult<T> {
    success: boolean;
    data: T;
    error: T;
}
