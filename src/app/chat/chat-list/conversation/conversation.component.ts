import { Component, input } from '@angular/core';
import { ConversationsResponse, UsersResponse } from '../../../shared/models/pb.types';
import { ConversationExpand } from '../../services/conversations.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent {
  conversation = input.required<ConversationsResponse<ConversationExpand>>();
  currentUserId = input.required<string>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  get email() {
    return this.conversation().receiver === this.currentUserId()
      ? this.conversation().expand?.sender.email
      : this.conversation().expand?.receiver.email;
  }
}
