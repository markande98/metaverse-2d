interface MessageCardProps {
  sendername: string;
  senderAvatar: string;
  message: string;
}

export const MessageCard = ({
  senderAvatar,
  sendername,
  message,
}: MessageCardProps) => {
  return (
    <div className="p-4 space-x-4 flex items-center">
      <div className="flex flex-col items-center">
        <div className="h-11 w-11 rounded-full bg-red-400 flex items-center justify-center">
          <img
            src={senderAvatar}
            alt="avatar"
            className="h-10 w-10 rounded-[1200px]"
          />
        </div>
        <p className="font-thin text-xs text-muted-foreground">{sendername}</p>
      </div>
      <div className="flex items-center max-w-[300px]">
        <p className="font-mono text-md text-muted-foreground bg-slate-100 p-6  rounded-tr-full rounded-b-full  break-words">
          {message}
        </p>
      </div>
    </div>
  );
};
