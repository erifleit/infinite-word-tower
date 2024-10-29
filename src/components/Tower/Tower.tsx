import { RowV2 } from "../Row";
import { useTower } from "./useTower";
import { Message } from "../Message";

export const Tower = () => {
  const { error, words } = useTower();

  // const words = Array.from({ length: 20 }).map(() => {
  //   return "HELLO";
  // });

  return (
    <div
      style={{
        // backgroundColor: "red",
        width: "100%",
        maxWidth: 700,
      }}
      className="tower"
    >
      {words.map((value, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
            key={index}
          >
            <RowV2
              value={value}
              rowIndex={index}
              disabled={index < words.length - 1}
              hasError={!!error && index === words.length - 1}
            />
          </div>
        );
      })}
      <Message />
    </div>
  );
};
