import "../scss/index.scss";
import base64 from "./base64";
import removeDataFromSessionStorage from "./removeSession";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// global variables
const history = document.querySelector(".history");

// check or get items from local session when browser will be refresh or loaded
const getItems = () => {
  base64();

  // set if history content is empty on load
  if (history.textContent === "")
    history.innerHTML = '<h3 class="noData">There is nothing to display</h3>';
};

// remove specific element from DOM and session storage
const handleButtons = (e) => {
  // check if clicked elemnt contains a delete class
  if (e.target.classList.contains("delete")) {
    // select current parent
    const div = e.target.parentElement.parentElement.parentElement;
    const parent = e.target.parentElement.parentElement;
    // select current encode or decode message
    const child = e.target.parentElement.previousElementSibling;

    // set animations on a specific element
    parent.style.animationName = "delete";
    parent.style.animationDuration = ".3s";
    parent.style.animationTimingFunction = "ease-out";

    // remove element after animation will finsh
    setTimeout(() => {
      // remove from session storage
      removeDataFromSessionStorage(child);
      // remove from DOM
      parent.remove();
      // set if history content is empty
      if (div.firstElementChild === null) {
        history.innerHTML =
          '<h3 class="noData">There is nothing to display</h3>';
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
    textToCopy.style.animationName = "copy_text";
    textToCopy.style.animationDuration = "1s";
    textToCopy.style.animationTimingFunction = "linear";

    setTimeout(() => {
      textToCopy.style = "";
    }, 1000);
  }
};

// load items from session if exist
document.addEventListener("DOMContentLoaded", getItems);

// remove data from DOM
history.addEventListener("click", handleButtons);
