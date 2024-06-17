import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent implements OnDestroy {
  currentRoute: string = '';
  isDestroying = new Subject<void>();
  constructor(
    activeRoute: ActivatedRoute,
    private chatService: ChatService
  ) {
    activeRoute.params.pipe(takeUntil(this.isDestroying)).subscribe(async (params) => {
      this.currentRoute = params['id'];
      await this.runConversationChanged(this.currentRoute);
    });
  }

  get chatsToDisplay() {
    return this.chatService.currentChat.asReadonly();
  }

  async runConversationChanged(rou: string) {
    await this.chatService.loadCurrentChats(rou);
  }

  ngOnDestroy(): void {
    this.isDestroying.next();
  }
}
