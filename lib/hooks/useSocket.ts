"use client";

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socket';
import { Message, RoomData } from '@/lib/types/chat';

export function useSocket(room: string | string[]) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');
  const socket: Socket = getSocket();

  useEffect(() => {
    socket.emit('joinRoom', room);

    socket.on('roomJoined', (data: RoomData) => {
      setMessages(data.messages);
    });

    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('error', (errorMessage: string) => {
      setError(errorMessage);
    });

    return () => {
      socket.off('roomJoined');
      socket.off('newMessage');
      socket.off('error');
    };
  }, [room, socket]);

  return { messages, error, socket };
}