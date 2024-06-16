import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
