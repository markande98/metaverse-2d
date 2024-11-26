import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageType } from "../types";
import { MessageCard } from "./message-card";

interface MessageBodyProps {
  messages: MessageType[];
}

export const MessageBody = ({ messages }: MessageBodyProps) => {
  return (
    <ScrollArea type="always">
      <div className="max-h-[615px] h-[615px]">
        {messages.map((msg, index) => (
          <MessageCard
            key={index}
            sendername={msg.username}
            senderAvatar={msg.userAvatar}
            message={msg.message}
          />
        ))}
        <div id="scroll" />
      </div>
    </ScrollArea>
  );
};
