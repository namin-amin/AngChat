import { Component, signal } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chat-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-editor.component.html',
  styleUrl: './chat-editor.component.scss',
})
export class ChatEditorComponent {
  message = signal<string>('');

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendDM(this.message());
  }
}
