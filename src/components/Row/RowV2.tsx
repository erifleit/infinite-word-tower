import { useMemo } from "react";
import {
  BORDER_RADIUS,
  GREEN,
  LIGHT_GREEN,
  LIGHT_RED,
  MARGIN,
  RED,
} from "../../constants";
import { useRowAnimations } from "./useRowAnimations";
import { isMobile } from "react-device-detect";
import { useUIState } from "../../store";

interface RowProps {
  rowIndex: number;
  disabled: boolean;
  hasError?: boolean;
  value: string;
}

const style: Record<string, React.CSSProperties> = {
  inputStyle: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: BORDER_RADIUS,
    borderWidth: isMobile ? 2 : 3,
    outline: "none",
    fontSize: "3em",
    aspectRatio: "1/1",
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

  const { keyboardVisible, setKeyboardVisible } = useUIState();

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
        width: "100%",
      }}
      className={shake ? "shake" : ""}
    >
      {rowValues.map((val, index) => (
        <div
          className={hop ? `hop-effect-${index}` : ""}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: MARGIN,
          }}
          key={index}
        >
          <div
            style={{
              ...style.inputStyle,
              ...(hasError ? style.inputError : {}),
              ...(disabled ? style.disabledInput : {}),
            }}
            className={animate ? "slide-in" : ""}
            onClick={() => {
              setKeyboardVisible(!keyboardVisible);
            }}
          >
            {val}
          </div>
        </div>
      ))}
    </div>
  );
};
