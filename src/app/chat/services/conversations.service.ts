import { PbService } from '../../shared/services/pb.service';
import {
  ChatsRecord,
  Collections,
  ConversationsResponse,
  UsersResponse,
} from '../../shared/models/pb.types';

export type ConversationExpand = {
  receiver: UsersResponse;
  sender: UsersResponse;
};

export class ConversationsService {
  constructor(
    private pb: PbService,
    private userId: string
  ) {}

  getAllConversations() {
    return this.pb.PB.collection(Collections.Conversations).getList<
      ConversationsResponse<ConversationExpand>
    >(1, 50, {
      sort: 'created',
      filter: `sender.id = "${this.userId}" || receiver.id = "${this.userId}"`,
      expand: 'receiver,sender',
    });
  }

  getChatsWithConversationId(conversationId: string) {
    return this.pb.PB.collection(Collections.Chats).getList<ChatsRecord>(1, 50, {
      filter: `chatTypeId = "${conversationId}"`,
    });
  }

  sendDirestMessage(message: string, conversation: string, creator: string) {
    return this.pb.PB.collection(Collections.Chats).create<ChatsRecord>({
      creator: creator,
      content: message,
      chatTypeId: conversation,
      isDm: true,
    });
  }
}
