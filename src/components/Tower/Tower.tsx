import { RowV2 } from "../Row";
import { useTower } from "./useTower";
import { ErrorMessage } from "../ErrorMessage";

export const Tower = () => {
  const { error, words } = useTower();

  // const words = Array.from({ length: 20 }).map(() => {
  //   return "HELLO";
  // });

  return (
    <div style={{ paddingTop: 100 }}>
      {words.map((value, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
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
      <ErrorMessage />
    </div>
  );
};
