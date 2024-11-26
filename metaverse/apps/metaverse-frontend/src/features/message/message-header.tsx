interface MessageHeaderProps {
  name?: string;
  thumbnail?: string | null;
}

export const MessageHeader = ({ name, thumbnail }: MessageHeaderProps) => {
  return (
    <div className="w-full hover:bg-slate-200 bg-slate-100 flex items-center justify-between px-6 py-4 cursor-pointer border-b">
      <p className="font-medium text-xs">{name}</p>
      <img
        src={thumbnail!}
        alt="space-thumbnail"
        className="w-12 h-12 rounded-full border border-zinc-500"
      />
    </div>
  );
};
