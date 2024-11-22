interface SpaceGridProps {
  width: number;
  height: number;
  currentUserX: number;
  currentUserY: number;
  currentUserName: string;
  users: Map<string, any>;
}

export const SpaceGrid = ({
  width,
  height,
  currentUserX,
  currentUserY,
  currentUserName,
  users,
}: SpaceGridProps) => {
  const renderGrid = () => {
    const otherUsersPos: number[] = [];
    const otherUsersName: string[] = [];
    const grid = [];

    users.forEach((user) => {
      otherUsersPos.push(user.x * width + user.y);
      otherUsersName.push(user.username);
    });

    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        const isUser = x == currentUserX && y == currentUserY;
        const isOtherUser = otherUsersPos.includes(x * width + y);
        const otherUser =
          otherUsersName[
            otherUsersPos.findIndex((val) => val === x * width + y)
          ];
        const cellClass = `w-8 h-8 border border-gray-200 flex items-center justify-center`;
        row.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {isUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 z-10 shadow-md -top-8 rounded-lg p-1">
                  {currentUserName}
                </p>
                <div className="w-4 h-4 rounded-full bg-red-400 z-20" />
              </div>
            )}
            {isOtherUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 z-10 shadow-md -top-8 rounded-lg p-1">
                  {isOtherUser && otherUser}
                </p>
                <div className="w-4 h-4 rounded-full bg-red-400 z-20" />
              </div>
            )}
          </div>
        );
      }
      grid.push(
        <div key={x} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
      <div className="mb-4 text-lg font-semibold">Use Arrow Keys move</div>
      <div className="border-2 border-gray-300 bg-white rounded-lg overflow-hidden">
        {renderGrid()}
      </div>
    </div>
  );
};