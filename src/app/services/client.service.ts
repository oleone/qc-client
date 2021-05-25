import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../helpers/crud-service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends CrudService<any> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.url_base}clients`);
  }
}
