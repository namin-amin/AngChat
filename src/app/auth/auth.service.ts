import { Injectable, signal } from '@angular/core';
import { PbService } from '../shared/services/pb.service';
import { Collections, UsersResponse } from '../shared/models/pb.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<UsersResponse | null>(null);

  constructor(private pb: PbService) {
    //todo need to handle onchange of PB and also result
    this.currentUser.set(this.pb.PB.authStore.model as UsersResponse | null);
    //todo also need to handle token expiry
  }

  async register(email: string, password: string, confirmPassword: string, userName: string) {
    console.log('trying to create user');
    let response = await this.pb.PB.collection(Collections.Users).create<UsersResponse>({
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      emailVisibility: true,
      name: userName,
    });
  }

  async login(email: string, password: string) {
    console.log('trying to login user');
    let response = await this.pb.PB.collection(Collections.Users).authWithPassword<UsersResponse>(
      email,
      password
    );
    this.pb.PB.authStore.save(response.token, response.record);
    this.currentUser.set(response.record);
  }

  logOut() {
    this.pb.PB.authStore.clear();
    this.currentUser.set(null); // todo this need to be made such that it gets back to logout page automatically
  }
}
