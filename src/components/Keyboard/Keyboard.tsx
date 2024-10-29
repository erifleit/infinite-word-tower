import { useGameStore, useUIState } from "../../store";

export const Keyboard = () => {
  const { setCurrentWord, currentWord } = useGameStore();
  const { keyboardVisible } = useUIState();

  const keys: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setCurrentWord(currentWord.slice(0, -1));
    } else {
      setCurrentWord(`${currentWord}${key}`);
    }
  };

  return keyboardVisible ? (
    <div style={styles.keyboard}>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
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
  );
};

const styles = {
  keyboard: {
    position: "fixed" as const,
    bottom: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px 8px 0 0",
    zIndex: 1000,
    width: "100%",
    maxWidth: 700,
    boxSizing: "border-box" as const,
  },
  row: {
    display: "flex",
    justifyContent: "space-between" as const, // Distributes keys evenly across the row
    marginBottom: "5px",
    width: "100%", // Ensures rows take full width of the container
  },
  key: {
    flex: "1", // Each key takes equal space in the row
    padding: "10px 0", // Vertical padding for better touch targets
    margin: "2px", // Margin between keys
    fontSize: "1em",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    // minWidth: "35px", // Minimum width for each key
    boxSizing: "border-box" as const,
  },
};
