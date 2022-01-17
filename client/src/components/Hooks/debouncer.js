let myTimeout;
const debouncer = (myFunction) => {
  if (myTimeout) {
    clearTimeout(myTimeout);
  }
  myTimeout = setTimeout(() => {
    myFunction();
  }, 800);
};

export { debouncer };
