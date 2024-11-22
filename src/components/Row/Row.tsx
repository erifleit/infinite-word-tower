import { useMemo, useState } from "react";
import {
  BORDER_RADIUS,
  LIGHT_RED,
  MARGIN,
  RED,
  BOX_BACKGROUND_COLOR,
  BOX_TEXT_COLOR,
  BOX_SELECTED,
} from "../../constants";
import { useRowAnimations } from "./useRowAnimations";
import { isMobile } from "react-device-detect";
import { useGameStore, useUIState } from "../../store";
import { useRow } from "./useRow";

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
    fontWeight: isMobile ? "normal" : "bold",
    color: BOX_TEXT_COLOR,
    borderColor: BOX_BACKGROUND_COLOR,
  },
  inputError: {
    borderColor: RED,
    backgroundColor: LIGHT_RED,
    color: RED,
  },
  disabledInput: {
    borderColor: BOX_BACKGROUND_COLOR,
    backgroundColor: BOX_BACKGROUND_COLOR,
  },
  selectedBox: {
    borderColor: BOX_SELECTED,
  },
};

export const Row = ({
  disabled,
  value,
  hasError = false,
  rowIndex,
}: RowProps) => {
  const { shake, animate, hop } = useRowAnimations({ disabled, hasError });
  const { isNewRow, handleClickBox, rowValues } = useRow({ rowIndex, value });
  const { selectedBox } = useGameStore();

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
      {rowValues.map((val, index) => {
        const isSelectedBox = selectedBox === index && isNewRow;
        return (
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
                ...(isSelectedBox ? style.selectedBox : {}),
              }}
              className={animate ? "slide-in" : ""}
              onClick={() => {
                handleClickBox(index);
              }}
            >
              {val}
            </div>
          </div>
        );
      })}
    </div>
  );
};
