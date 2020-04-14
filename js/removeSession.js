// remove from session storage
const removeDataFromSessionStorage = (dataItem) => {
  let source;

  // get data from session storage and put in to variable
  source = JSON.parse(sessionStorage.getItem("data"));

  for (let i = source.length - 1; i >= 0; i -= 1) {
    // compare if message from DOM and session storage are equel
    if (dataItem.innerText === source[i].text) {
      // if it dose delete selected item
      source.splice(i, 1);
    }
  }
  sessionStorage.setItem("data", JSON.stringify(source));
};

export default removeDataFromSessionStorage;
