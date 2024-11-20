import { useMemo } from "react";
import { MESSAGES, TEXT_COLOR } from "../../constants";
import { useGameStore, useUIState } from "../../store";

const styles = {
  keyboard: {
    position: "fixed" as const,
    bottom: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    borderRadius: "8px 8px 0 0",
    zIndex: 1000,
    width: "100%",
    maxWidth: 700,
    boxSizing: "border-box" as const,
    backgroundColor: "#314451",
  },
  row: {
    display: "flex",
    justifyContent: "space-between" as const, // Distributes keys evenly across the row
    marginBottom: 4,
    width: "100%", // Ensures rows take full width of the container
    marginHorizontal: 4,
  },
  key: {
    flex: "1", // Each key takes equal space in the row
    padding: "10px 0", // Vertical padding for better touch targets
    margin: "2px", // Margin between keys
    fontSize: "1em",
    backgroundColor: "#3c4e5b",
    color: TEXT_COLOR,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    boxSizing: "border-box" as const,
  },
};

export const Keyboard = () => {
  const { handleKeyPress, message } = useGameStore();
  const { keyboardVisible, toggleKeyboard } = useUIState();

  const keys: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const isLoading = useMemo(() => message === MESSAGES.LOADING, [message]);

  return (
    <div style={styles.keyboard}>
      <div
        style={{
          paddingBottom: 12,
          paddingTop: 8,
          borderRadius: "8px 8px 0 0",
          width: "100%",
          height: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3c4e5b",
        }}
      >
        <div
          style={{ width: "15%", color: "#273744", cursor: "pointer" }}
          onClick={toggleKeyboard}
        >
          {keyboardVisible ? "▼" : "▲"}
        </div>
      </div>
      {keyboardVisible ? (
        <div className="keyboard" style={{ marginTop: 8 }}>
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => (isLoading ? handleKeyPress(key) : null)}
                  style={styles.key}
                >
                  {key === "Backspace" ? "←" : key}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
