import { PbService } from '../../shared/services/pb.service';
import {
  ChatsRecord,
  ChatsResponse,
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

  getConversationById(conversationId: string) {
    return this.pb.PB.collection(Collections.Conversations).getOne<
      ConversationsResponse<ConversationExpand>
    >(conversationId, {
      expand: 'rreceiver,sender',
    });
  }

  getChatsWithConversationId(conversationId: string) {
    return this.pb.PB.collection(Collections.Chats).getList<ChatsResponse>(1, 50, {
      filter: `chatTypeId = "${conversationId}"`,
    });
  }

  sendDirestMessage(message: string, conversation: string, creator: string) {
    return this.pb.PB.collection(Collections.Chats).create<ChatsResponse>({
      creator: creator,
      content: message,
      chatTypeId: conversation,
      isDm: true,
    });
  }
}
