import { Row } from "../Row";
import { useRowTower } from "./useTower";
import { ErrorMessage } from "../ErrorMessage";

export const Tower = () => {
  const { numOfRows, handleRowFilled, error, clearError } = useRowTower();

  return (
    <div>
      {Array.from({ length: numOfRows }).map((_value, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Row
              key={index}
              rowIndex={index}
              onRowFilled={handleRowFilled}
              disabled={index < numOfRows - 1}
              clearError={clearError}
              hasError={!!error && index === numOfRows - 1}
            />
          </div>
        );
      })}
      <ErrorMessage message={error} />
    </div>
  );
};
