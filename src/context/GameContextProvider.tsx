import { GameContext, useGameContext } from "./GameContext";

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const gameContext = useGameContext();
  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  );
};
