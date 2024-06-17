import { Component, effect, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ConversationsResponse, UsersResponse } from '../../../shared/models/pb.types';
import { ConversationExpand } from '../../services/conversations.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnDestroy {
  conversation = input.required<ConversationsResponse<ConversationExpand>>();
  currentUserId = input.required<string>();

  isDestroyed = new Subject<void>();

  constructor(private chatService: ChatService) {}
  ngOnDestroy(): void {
    this.isDestroyed.next();
  }

  get isActiveConversation() {
    return this.conversation().id === this.chatService.currentConvId();
  }

  get name() {
    return this.conversation().receiver === this.currentUserId()
      ? this.conversation().expand?.sender.name
      : this.conversation().expand?.receiver.name;
  }
}
