import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private loadingSource$ = new BehaviorSubject<boolean | null>(Boolean(sessionStorage.getItem('loading')));
  private paramSource$ = new BehaviorSubject<any | null>(sessionStorage.getItem('param'));

  getLoading = this.loadingSource$.asObservable();
  getParam = this.paramSource$.asObservable();

  constructor() { }

  setLoading(state: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem('loading', JSON.stringify(state));
        this.loadingSource$.next(state);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  setParam(param: any) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem('param', JSON.stringify(param));
        this.paramSource$.next(param);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

}
