import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-editor.component.html',
  styleUrl: './chat-editor.component.scss',
})
export class ChatEditorComponent {
  message = signal<string>('');
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  sendMessage() {
    this.chatService.sendDM(this.message());
    this.message.set('');
  }

  logout() {
    this.authService.logOut();
  }
}
