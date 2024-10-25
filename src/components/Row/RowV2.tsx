import { useMemo } from "react";
import {
  BORDER_RADIUS,
  BOX_WIDTH,
  GREEN,
  LIGHT_GREEN,
  LIGHT_RED,
  MARGIN,
  RED,
} from "../../constants";
import { useRowAnimations } from "./useRowAnimations";

interface RowProps {
  rowIndex: number;
  disabled: boolean;
  hasError?: boolean;
  value: string;
}

const style: Record<string, React.CSSProperties> = {
  inputStyle: {
    width: BOX_WIDTH,
    height: BOX_WIDTH,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: MARGIN,
    borderStyle: "solid",
    borderRadius: BORDER_RADIUS,
    outline: "none",
    fontSize: 24,
  },
  inputError: {
    borderColor: RED,
    backgroundColor: LIGHT_RED,
  },
  disabledInput: {
    borderColor: GREEN,
    backgroundColor: LIGHT_GREEN,
  },
};

export const RowV2 = ({ disabled, value, hasError = false }: RowProps) => {
  const { shake, animate, hop } = useRowAnimations({ disabled, hasError });

  const rowValues = useMemo(
    () =>
      Array.from({ length: 5 }).map((_elem, index) => {
        return value[index] || "";
      }),
    [value]
  );

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "10px",
        justifyContent: "center",
      }}
      className={shake ? "shake" : ""}
    >
      {/* <div
        style={{
          marginTop: MARGIN * 4,
          marginRight: MARGIN * 2,
          marginLeft: MARGIN * 2,
        }}
        className={animate ? "slide-in" : ""}
      >
        {rowIndex + 1}
      </div> */}
      {rowValues.map((val, index) => (
        <div className={hop ? `hop-effect-${index}` : ""} key={index}>
          <div
            style={{
              ...style.inputStyle,
              ...(hasError ? style.inputError : {}),
              ...(disabled ? style.disabledInput : {}),
            }}
            className={animate ? "slide-in" : ""}
          >
            {val}
          </div>
        </div>
      ))}
    </div>
  );
};
