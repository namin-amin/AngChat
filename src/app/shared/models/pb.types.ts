/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Chats = 'chats',
  Conversations = 'conversations',
  Group = 'group',
  Groupconversations = 'groupconversations',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type ChatsRecord = {
  chatTypeId?: string;
  content?: HTMLString;
  creator?: RecordIdString;
  isDm?: boolean;
};

export type ConversationsRecord = {
  receiver?: RecordIdString;
  sender?: RecordIdString;
};

export type GroupRecord = {
  admins?: RecordIdString[];
  avatar?: string;
  members?: RecordIdString[];
  name?: string;
};

export type GroupconversationsRecord = {
  chat?: RecordIdString[];
  group?: RecordIdString;
  sender?: RecordIdString;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type ChatsResponse<Texpand = unknown> = Required<ChatsRecord> & BaseSystemFields<Texpand>;
export type ConversationsResponse<Texpand = unknown> = Required<ConversationsRecord> &
  BaseSystemFields<Texpand>;
export type GroupResponse<Texpand = unknown> = Required<GroupRecord> & BaseSystemFields<Texpand>;
export type GroupconversationsResponse<Texpand = unknown> = Required<GroupconversationsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  chats: ChatsRecord;
  conversations: ConversationsRecord;
  group: GroupRecord;
  groupconversations: GroupconversationsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  chats: ChatsResponse;
  conversations: ConversationsResponse;
  group: GroupResponse;
  groupconversations: GroupconversationsResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'chats'): RecordService<ChatsResponse>;
  collection(idOrName: 'conversations'): RecordService<ConversationsResponse>;
  collection(idOrName: 'group'): RecordService<GroupResponse>;
  collection(idOrName: 'groupconversations'): RecordService<GroupconversationsResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
};
