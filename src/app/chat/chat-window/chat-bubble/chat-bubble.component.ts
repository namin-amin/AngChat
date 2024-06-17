import { Component, input } from '@angular/core';
import { ChatsResponse } from '../../../shared/models/pb.types';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss',
})
export class ChatBubbleComponent {
  chat = input.required<ChatsResponse>();
  isSentByMe = input.required<boolean>();
}
