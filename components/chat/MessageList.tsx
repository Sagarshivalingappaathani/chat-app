import { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from './MessageBubble';
import { Message } from '@/lib/types/chat';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export function MessageList({ messages, currentUser }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isCurrentUser={msg.sender === currentUser}
          />
        ))}
      </div>
    </ScrollArea>
  );
}