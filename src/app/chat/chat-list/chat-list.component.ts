import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatService } from '../services/chat.service';
import { UsersResponse } from '../../shared/models/pb.types';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  imports: [ConversationComponent],
})
export class ChatListComponent implements OnInit {
  currentUser: UsersResponse;
  constructor(
    private chatServie: ChatService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser()!;
  }
  async ngOnInit(): Promise<void> {
    await this.chatServie.loadConversations();
  }

  get conversations() {
    return this.chatServie.conversations.asReadonly();
  }
}
