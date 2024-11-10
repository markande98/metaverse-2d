type CardWrapperProps = {
  children: React.ReactNode;
};

export const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="w-full max-w-screen-xl min-h-screen mx-auto px-2 py-4">
      {children}
    </div>
  );
};
