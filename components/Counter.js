import React, { useState } from 'react';
import useAppStore from '../store/appStore';

const Counter = () => {
  const { count, updateCount } = useAppStore();

  const increment = () => {
    updateCount(count + 1);
  };

  const decrement = () => {
    updateCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
