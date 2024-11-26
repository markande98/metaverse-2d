import { Input } from "@/components/ui/input";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Send, SmilePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useScrollModal } from "./hooks/use-scroll";

interface MessageInputProps {
  handleClickMessage: (value: string) => void;
}

export const MessageInput = ({ handleClickMessage }: MessageInputProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const { onClick } = useScrollModal();

  const handleEmoji = (emojiData: EmojiClickData) => {
    setMessage((msg) => {
      let prev = msg;
      prev += emojiData.emoji;
      return prev;
    });
  };

  const handleMessage = useCallback(() => {
    if (!message) return;
    handleClickMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
    onClick("scroll");
  }, [message, handleClickMessage, onClick]);

  return (
    <>
      {showEmojiPicker && (
        <EmojiPicker height={1000} onEmojiClick={handleEmoji} />
      )}
      <div className="w-full p-4 flex items-center justify-between space-x-4 bg-zinc-100">
        <div className="flex flex-1 items-center justify-between space-x-2 p-2 rounded-md">
          <div
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="flex items-center justify-center p-2 rounded-full bg-zinc-200 border border-gray-300"
          >
            <SmilePlus
              size={20}
              className="cursor-pointer text-muted-foreground hover:scale-105 duration-300"
            />
          </div>
          <Input
            className="border-none shadow-none focus-visible:ring-0"
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div
          onClick={handleMessage}
          className="flex items-center justify-between bg-slate-100 p-2 rounded-full cursor-pointer border-2"
        >
          <Send
            size={20}
            color="gray"
            className="hover:rotate-45 transition duration-300"
          />
        </div>
      </div>
    </>
  );
};
