import { Message } from '@/lib/types/chat';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary'
        }`}
      >
        <p className="text-sm font-medium">{message.sender}</p>
        <p>{message.text}</p>
        <p className="text-xs opacity-70 mt-1">
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>
    </div>
  );
}