import { ChatRoom } from '@/components/chat/ChatRoom';

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Since our chat rooms are dynamic and created at runtime,
  // we'll return an empty array as we don't know the room names beforehand
  return [];
}

export default function ChatRoomPage() {
  return <ChatRoom />;
}