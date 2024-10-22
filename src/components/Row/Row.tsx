import { useRow } from "./useRow";
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
  onRowFilled: (word: string) => Promise<void>;
  rowIndex: number;
  disabled: boolean;
  clearError: () => void;
  hasError?: boolean;
}

const style: Record<string, React.CSSProperties> = {
  inputStyle: {
    width: BOX_WIDTH,
    height: BOX_WIDTH,
    textAlign: "center",
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

export const Row = ({
  onRowFilled,
  disabled,
  clearError,
  hasError = false,
  rowIndex,
}: RowProps) => {
  const { shake, animate, hop } = useRowAnimations({ disabled, hasError });
  const { rowValues, inputRefs, handleChange, handleKeyDown } = useRow({
    onRowFilled,
    clearError,
  });

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "10px",
        justifyContent: "center",
      }}
      className={shake ? "shake" : ""}
    >
      <div
        style={{ marginTop: MARGIN * 4, marginRight: MARGIN * 2 }}
        className={animate ? "slide-in" : ""}
      >
        {rowIndex + 1}
      </div>
      {rowValues.map((val, index) => (
        <div className={hop ? `hop-effect-${index}` : ""}>
          <input
            key={index}
            type="text"
            inputMode="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            style={{
              ...style.inputStyle,
              ...(hasError ? style.inputError : {}),
              ...(disabled ? style.disabledInput : {}),
            }}
            disabled={disabled}
            autoFocus={!disabled && index === 0}
            className={animate ? "slide-in" : ""}
          />
        </div>
      ))}
    </div>
  );
};
