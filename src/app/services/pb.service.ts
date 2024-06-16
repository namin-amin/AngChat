import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PbService {
  pb: PocketBase;
  constructor() {
    this.pb = new PocketBase("http://127.0.0.1:8090");
  }

  get PB(){
    return this.pb;
  }
}
