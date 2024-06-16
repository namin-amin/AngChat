import { Injectable } from '@angular/core';
import { PbService } from '../services/pb.service';
import { Collections, UsersResponse } from '../shared/pb.types';
import { BehaviorSubject } from 'rxjs';
import { RecordAuthResponse } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<UsersResponse | null>;

  constructor(private pb: PbService) {
    this.user = new BehaviorSubject<UsersResponse | null>(null);
    this.user.next(this.pb.PB.authStore.model as UsersResponse);
  }

  async register(email: string, password: string, confirmPassword: string) {
    console.log('trying to create user');
    return await this.pb.PB.collection(Collections.Users).create<UsersResponse>({
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      emailVisibility: true,
    });
  }

  async login(email: string, password: string) {
    console.log('trying to login user');
    let response = await this.pb.PB.collection(Collections.Users).authWithPassword<UsersResponse>(
      email,
      password
    );
    this.pb.PB.authStore.save(response.token, response.record);
    this.user.next(response.record);
    return response;
  }

  logOut() {
    this.pb.PB.authStore.clear();
    this.user.next(null);
  }
}
