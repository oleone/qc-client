import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiResult, ServerError } from '../types/api-results';
import { ClientModel } from '../models/client.model';

export class CrudService<T> {
  constructor(protected readonly http: HttpClient, public readonly base_url: string) {}

//   find(params: PaginationParams): Observable<ApiResult<T>> {
  find(): Observable<ApiResult<ClientModel>> {
    return this.http.get<ApiResult<ClientModel>>(`${this.base_url}`).pipe(
      delay(2000),
      tap(console.log)
    );
  }

  findById(id: string): Observable<T | ServerError> {
    return this.http.get<T>(`${this.base_url}/${id}`).pipe(take(1));
  }

  private create(entity: T): Observable<ApiResult<T> | ServerError> {
    return this.http.post<ApiResult<T>>(`${this.base_url}`, entity).pipe(take(1));
  }

  private update(entity: T | any): Observable<ApiResult<T> | ServerError> {
    // tslint:disable-next-line: no-string-literal
    return this.http.put<ApiResult<T>>(`${this.base_url}/${entity['_id']}`, entity).pipe(take(1));
  }

  save(entity: T | any): Observable<ApiResult<T> | ServerError> {
    // tslint:disable-next-line: no-string-literal
    if (entity['_id']) {
      return this.update(entity);
    }
    return this.create(entity);
  }

  delete(entityId: string) {
    return this.http.delete(`${this.base_url}/${entityId}`).pipe(take(1));
  }
}
