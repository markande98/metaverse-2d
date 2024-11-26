import { useGetSpace } from "../spaces/hooks/use-get-space";
import { MessageType } from "../types";
import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";
import { MessageInput } from "./message-input";

interface MessagesProps {
  spaceId: string;
  handleClickMessage: (value: string) => void;
  messages: MessageType[];
}

export const Messages = ({
  spaceId,
  handleClickMessage,
  messages,
}: MessagesProps) => {
  const { space } = useGetSpace(spaceId);

  return (
    <div className="h-[785px] flex flex-col border-2 rounded-xl flex-1">
      <MessageHeader name={space?.name} thumbnail={space?.thumbnail} />
      <MessageBody messages={messages} />
      <MessageInput handleClickMessage={handleClickMessage} />
    </div>
  );
};
