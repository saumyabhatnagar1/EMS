import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  readonly baseApiUrl: string = 'http://localhost:8000/api/';
  constructor() { }
}
