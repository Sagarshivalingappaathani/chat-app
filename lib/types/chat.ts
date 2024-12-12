// Types for chat-related data
export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

export interface RoomData {
  room: string;
  messages: Message[];
}

export interface SendMessageData {
  room: string | string[];
  message: string;
  sender: string;
}