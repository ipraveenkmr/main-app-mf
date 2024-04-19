import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the counter
  const decrement = () => {
    setCount(count - 1);
  };

  //   useEffect(() => {
  //     loadCounterState();
  // }, []);

  const loadCounterState = async () => {
    console.log("Running...: ");
    try {
      const db = await openDB();
      const transaction = db.transaction(["counterStore"], "readwrite");
      const objectStore = transaction.objectStore("counterStore");
      const objectStoreRequest = objectStore.get(1);
      objectStoreRequest.onsuccess = (event) => {
        const myRecord = objectStoreRequest.result;
        if(myRecord !== undefined) {
          console.log("Saved myRecord: ", myRecord);
          setCount(myRecord);
        }
      };
    } catch (error) {
      console.error('Error loading counter state:', error);
    }
  };

  // Open IndexedDB database (assuming in a separate helper function)
  const openDB = async () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('counterDB', 1);
      request.onerror = (event) => {
        reject('Error opening database: ' + event.target.errorCode);
      };
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('counterStore');
      };
    });
  };

  // Save counter state only when it changes
  useEffect(() => {
    const saveCounterState = async () => {
      try {
        const db = await openDB();
        const tx = db.transaction('counterStore', 'readwrite');
        const store = tx.objectStore('counterStore');
        const savedCount = await store.get(1);

        // Only save if the count has actually changed
        if (savedCount !== count) {
          await store.put(count, 1);
        }
      } catch (error) {
        console.error('Error saving counter state:', error);
      }
    };

    saveCounterState();
  }, [count]);

  // Load counter state on component mount (optional)
  // useEffect(() => {
  //   const loadCounterState = async () => {
  //     try {
  //       const db = await openDB();
  //       const tx = db.transaction('counterStore', 'readonly');
  //       const store = tx.objectStore('counterStore');
  //       const savedCount = await store.get(1);
  //       if (savedCount !== undefined) {
  //         setCount(savedCount);
  //       }
  //     } catch (error) {
  //       console.error('Error loading counter state:', error);
  //     }
  //   };

  //   loadCounterState();
  // }, []);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
