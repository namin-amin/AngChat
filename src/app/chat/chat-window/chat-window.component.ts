import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { ChatEditorComponent } from '../chat-editor/chat-editor.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { ChatsResponse } from '../../shared/models/pb.types';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  imports: [ChatEditorComponent, ChatBubbleComponent],
})
export class ChatWindowComponent implements OnDestroy, OnInit, AfterViewChecked {
  @ViewChild('chatBubbleContainer') private myScrollContainer!: ElementRef;
  currentRoute: string = '';
  conversationName: string = '';
  currentUserId: string = '';
  isDestroying = new Subject<void>();
  constructor(
    activeRoute: ActivatedRoute,
    private chatService: ChatService,
    authService: AuthService
  ) {
    activeRoute.params.pipe(takeUntil(this.isDestroying)).subscribe(async (params) => {
      this.currentRoute = params['id'];
      this.conversationName = params['name'];

      await this.runConversationChanged(this.currentRoute);
    });
    this.currentUserId = authService.currentUser()?.id!;
  }

  get chatsToDisplay() {
    return this.chatService.currentChat.asReadonly();
  }

  async runConversationChanged(rou: string) {
    await this.chatService.loadCurrentChats(rou);
  }

  isSentByMe(chat: ChatsResponse) {
    return chat.creator === this.currentUserId;
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.isDestroying.next();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
