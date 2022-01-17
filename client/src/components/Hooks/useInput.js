// import { useState } from "react";

// const useInput = (value = "") => {
//   const [input, setInput] = useState(value);
//   let myTimeout;
//   const inputChangeHandler = (value) => {
//     let myValue = value.current.value;
//     if (myTimeout) {
//       clearTimeout(myTimeout);
//     }
//     myTimeout = setTimeout(() => {
//       setInput(myValue);
//     }, 800);
//   };
//   return { input, inputChangeHandler };
// };

// export { useInput };
