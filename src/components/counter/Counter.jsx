/* eslint-disable no-undef */
import { useState } from "react";
import "./Counter.css";
import { CounterButton } from "./CounterButton";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCountParent = (by) => {
    setCount(count + by);
  };

  const decrementCountParent = (by) => {
    setCount(count - by);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <>
      <span className="totalCount">{count}</span>
      <CounterButton
        count={count}
        incrementCountParent={incrementCountParent}
        decrementCountParent={decrementCountParent}
      />
      <CounterButton
        by={5}
        incrementCountParent={incrementCountParent}
        decrementCountParent={decrementCountParent}
      />
      <button className="resetButton button" onClick={resetCounter}>
        Reset
      </button>
    </>
  );
};
