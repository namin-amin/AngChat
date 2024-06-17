import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatEditorComponent } from './chat-editor/chat-editor.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [ChatListComponent, RouterModule, ChatEditorComponent],
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
