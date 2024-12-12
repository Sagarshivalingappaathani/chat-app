"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { useSocket } from '@/lib/hooks/useSocket';
import { generateUsername } from '@/lib/utils/user';
import { SendMessageData } from '@/lib/types/chat';

export function ChatRoom() {
  const { room } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState(generateUsername);
  const { messages, socket } = useSocket(room);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData: SendMessageData = {
        room,
        message: newMessage,
        sender: username
      };
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="max-w-4xl mx-auto h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Room: {room}</h1>
          <p className="text-sm text-gray-500">Chatting as {username}</p>
        </div>

        <MessageList messages={messages} currentUser={username} />
        
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={sendMessage}
        />
      </Card>
    </div>
  );
}