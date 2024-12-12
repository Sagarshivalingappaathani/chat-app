"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';
import { initSocket } from '@/lib/socket';

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const socket = initSocket();

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      socket.emit('createRoom', roomName);
      socket.on('roomCreated', (room) => {
        router.push(`/chat/${room}`);
      });
    }
  };

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      socket.emit('joinRoom', roomName);
      socket.on('roomJoined', () => {
        router.push(`/chat/${roomName}`);
      });
      socket.on('error', (error) => {
        alert(error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-4">
          <MessageSquare className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to ChatRooms</h1>
          <p className="text-gray-500 dark:text-gray-400">Create or join a room to start chatting</p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCreateRoom}
              className="w-full"
              variant="default"
            >
              Create Room
            </Button>
            <Button
              onClick={handleJoinRoom}
              className="w-full"
              variant="outline"
            >
              Join Room
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}