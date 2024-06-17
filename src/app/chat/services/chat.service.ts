import { Injectable, signal } from '@angular/core';
import { PbService } from '../../shared/services/pb.service';
import { AuthService } from '../../auth/auth.service';
import { ConversationExpand, ConversationsService } from './conversations.service';
import {
  ChatsRecord,
  ChatsResponse,
  Collections,
  ConversationsRecord,
  ConversationsResponse,
} from '../../shared/models/pb.types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private conversationsService: ConversationsService;
  private userId: string = '';

  public currentConvId = signal<string>('');
  public conversations = signal<ConversationsResponse<ConversationExpand>[]>([]);

  private cachedChats: Map<string, ChatsResponse[]> = new Map();

  public currentChat = signal<ChatsResponse[] | null>(null);

  constructor(
    private pb: PbService,
    authService: AuthService
  ) {
    this.userId = authService.currentUser()?.id!;
    this.conversationsService = new ConversationsService(pb, this.userId);
    this.setUpSubscriptions();
  }

  async loadConversations() {
    let results = await this.conversationsService.getAllConversations();
    this.conversations.set(results.items);
  }

  async loadCurrentChats(currentConversationId: string) {
    this.currentConvId.set(currentConversationId);
    if (this.cachedChats.has(currentConversationId)) {
      this.currentChat.set(this.cachedChats.get(currentConversationId)!); //todo correct
      return;
    }
    let result = await this.conversationsService.getChatsWithConversationId(currentConversationId);

    console.log(result);

    this.cachedChats.set(currentConversationId, result.items);
    this.currentChat.set(result.items);
  }

  async sendDM(message: string) {
    if (this.currentConvId() === '') {
      return;
    }
    let result = await this.conversationsService.sendDirestMessage(
      message,
      this.currentConvId(),
      this.userId
    );

    console.log('trying to send dm');
  }

  private setUpSubscriptions() {
    this.pb.PB.collection(Collections.Chats).subscribe<ChatsResponse>('*', (e) => {
      this.handleChatCallBacks(e.record);
    });
    this.pb.PB.collection(Collections.Conversations).subscribe<ConversationsResponse>(
      '*',
      async (e) => {
        console.log(e);

        await this.handleConversationCallBack(e.record);
      }
    );
  }

  private async handleConversationCallBack(conversation: ConversationsResponse) {
    let related = conversation.receiver === this.userId || conversation.sender === this.userId;
    if (!related) {
      return;
    }
    if (this.cachedChats.has(conversation.id)) {
      console.log('something gone wrong');
      return;
    }
    let result = await this.conversationsService.getConversationById(conversation.id);
    this.conversations.update((old) => [...old, result]);
    this.cachedChats.set(conversation.collectionId, []);
  }

  private handleChatCallBacks(eachChat: ChatsResponse) {
    let conversationId = eachChat.chatTypeId;
    let oldChat = this.cachedChats.get(conversationId!);
    if (oldChat === undefined) {
      oldChat = [];
    }
    this.cachedChats.set(conversationId!, [...oldChat, eachChat]);
    if (this.currentConvId() === conversationId) {
      this.currentChat.update((old) => [...old!, eachChat]);
    }
  }
}
