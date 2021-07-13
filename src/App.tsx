import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [currentValue, setCurrentValue] = useState("O");
  const [looser, setLooser] = useState("");
  const [checkedList, setCheckedList]: any = useState({});
  const [winningPattern, setWinningPattern]: any = useState([]);
  const [messages, setMessages]: any = useState(["Game has started ... "]);
  useEffect(() => {
    rules();
  }, [checkedList]);
  useEffect(() => {
    if (looser === "none") {
      setMessages(["The Game Ends in a Draw", ...messages]);
      return;
    }
    if (looser) {
      setMessages([
        looser === "O" ? "Player 2 wins the Game" : "Player 1 wins the Game",
        ...messages,
      ]);
    }
  }, [looser]);
  function handleClick(currentIndex) {
    if (!looser) {
      currentIndex = currentIndex.toString();
      if (!checkedList[currentIndex]) {
        setCheckedList({ ...checkedList, [currentIndex]: currentValue });
        if (currentValue === "O") {
          setCurrentValue("X");
          setMessages(["Player 1 selected " + currentIndex, ...messages]);
        } else {
          setCurrentValue("O");
          setMessages(["Player 2 selected " + currentIndex, ...messages]);
        }
      }
    }
  }

  function rules() {
    const winningMoves = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (let eachWinningMove of winningMoves) {
      if (
        (checkedList[eachWinningMove[0]] === "O" &&
          checkedList[eachWinningMove[1]] === "O" &&
          checkedList[eachWinningMove[2]] === "O") ||
        (checkedList[eachWinningMove[0]] === "X" &&
          checkedList[eachWinningMove[1]] === "X" &&
          checkedList[eachWinningMove[2]] === "X")
      ) {
        setLooser(currentValue);
        setWinningPattern([...eachWinningMove]);
        return;
      }
    }
    if (Object.keys(checkedList).length === 9 && !looser) {
      setLooser("none");
    }
  }
  function handleReset() {
    setMessages(["Game has started ... "]);
    setCurrentValue("O");
    setLooser("");
    setCheckedList({});
    setWinningPattern([]);
  }
  function cssForEachGrid(currentIndex) {
    const winnerColor = "winner";
    return winningPattern?.includes(currentIndex) ? winnerColor : null;
  }
  return (
    <div className="home">
      <div className={`tic ${looser === "none" ? "draw" : null}`}>
        {[...Array(9)].map((x, index) => (
          <EachGrid
            key={index}
            handleClick={handleClick}
            cssForEachGrid={cssForEachGrid}
            currentIndex={index + 1}
            checkedList={checkedList}
          />
        ))}
      </div>
      <div className="output-console">
        <button style={{ cursor: "pointer" }} onClick={handleReset}>
          Reset
        </button>
        <div className="console">
          {messages?.map((message, index) => (
            <p key={index}>
              <span>=&gt; </span>
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function EachGrid({ handleClick, cssForEachGrid, checkedList, currentIndex }) {
  return (
    <div
      onClick={() => handleClick(currentIndex)}
      className={`each ${cssForEachGrid(currentIndex)}`}
    >
      {checkedList[currentIndex] ?? null}
    </div>
  );
}

export default App;
