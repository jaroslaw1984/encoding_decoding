import removeDataFromSessionStorage from "./removeSession";

// remove specific element from DOM and session storage
const handleButtonsMsg = (e) => {
  const section = document.getElementsByTagName("section")[1];

  // check if clicked elemnt contains a delete class
  if (e.target.classList.contains("delete")) {
    // select current parent
    const div = e.target.parentElement.parentElement.parentElement;
    const parent = e.target.parentElement.parentElement;
    // select current encode or decode message
    const child = e.target.parentElement.previousElementSibling;

    // set animations on a specific element
    parent.setAttribute("style", "animation: delete .3s ease-out");

    // remove element after animation will finsh
    setTimeout(() => {
      // remove from session storage
      removeDataFromSessionStorage(child);
      // remove from DOM
      parent.remove();
      // set text if history content is empty
      if (div.firstElementChild === null) {
        const h3 = document.createElement("h3");
        h3.setAttribute("class", "noData");
        const text = "There is nothing to display";

        h3.appendChild(document.createTextNode(text));

        section.appendChild(h3);
      }
    }, 300);
  }

  if (e.target.classList.contains("copy")) {
    // selected div text
    const textToCopy = e.target.parentElement.previousElementSibling;
    //check and see if the user had a text selection range
    let currentRange;
    //create a selection range
    const copyRange = document.createRange();

    if (document.getSelection().rangeCount > 0) {
      //the user has a text selection range, store it
      currentRange = document.getSelection().getRangeAt(0);
      //remove the current selection
      window.getSelection().removeRange(currentRange);
    }

    //choose the element we want to select the text of
    copyRange.selectNode(textToCopy);
    //select the text inside the range
    window.getSelection().addRange(copyRange);
    //copy the text to the clipboard
    document.execCommand("copy");

    //remove our selection range
    window.getSelection().removeRange(copyRange);

    //return the old selection range
    if (currentRange) {
      window.getSelection().addRange(currentRange);
    }
    // set animations on a specific element for copy text
    textToCopy.setAttribute("style", "animation: copy_text 1s linear");
    setTimeout(() => {
      textToCopy.removeAttribute("style");
    }, 1000);
  }
};

export default handleButtonsMsg;
