import { spaceElementsInfo } from "../types";

interface SpaceGridProps {
  width: number;
  height: number;
  currentUserX: number;
  currentUserY: number;
  currentUserName?: string;
  users: Map<string, any>;
  spaceElements: spaceElementsInfo[];
  currentUserAvatar?: string | null;
}

export const SpaceGrid = ({
  width,
  height,
  currentUserX,
  currentUserY,
  currentUserName,
  users,
  spaceElements,
  currentUserAvatar,
}: SpaceGridProps) => {
  const renderGrid = () => {
    const otherUsersPos: number[] = [];
    const otherUsersName: string[] = [];
    const otherUsersAvatar: string[] = [];
    const elements: number[] = [];
    spaceElements.forEach((me) => {
      elements.push(me.x * width + me.y);
    });
    const grid = [];

    users.forEach((user) => {
      otherUsersPos.push(user.x * width + user.y);
      otherUsersName.push(user.username);
      otherUsersAvatar.push(user.userAvatar);
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
        const otherUserAvatar =
          otherUsersAvatar[
            otherUsersPos.findIndex((val) => val === x * width + y)
          ];
        const isElement = elements.includes(x * width + y);
        const spaceElement = spaceElements.find(
          (se) => se.x === x && se.y === y
        );
        const cellClass = `w-8 h-8 border border-gray-200 flex items-center justify-center`;
        row.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {isUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 shadow-md -top-8 rounded-lg p-1">
                  {currentUserName}
                </p>
                {currentUserAvatar ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={currentUserAvatar}
                    alt="user-avatar"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-400" />
                )}
              </div>
            )}
            {isOtherUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 shadow-md -top-8 rounded-lg p-1">
                  {isOtherUser && otherUser}
                </p>
                {otherUserAvatar ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={otherUserAvatar}
                    alt="other-user-avatar"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-400" />
                )}
              </div>
            )}
            {isElement && (
              <img
                src={spaceElement?.element.imageUrl}
                alt="element"
                className="w-8 h-8"
              />
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
