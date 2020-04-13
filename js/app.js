import "../scss/index.scss";
import Encode from "./encoding";
import Decode from "./decoding";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// global variables
const radioBtn = document.querySelectorAll('input[name="radio_btn"]');
const textareaValue = document.getElementById("form-group__textarea");
const btn = document.getElementById("btn");
const history = document.querySelector(".history");
const textareaText = document.querySelector(".form-group__label");

// this function return what option is selected from radio input
const getSelectionValue = () => {
  let value;

  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      value = radioBtn[i].value;

      break;
    }
  }

  return value;
};

// main function that use class to encode and decode a string
const base64 = () => {
  // local session encode array values
  let source;
  // put all data from session storage to DOM
  let data = "";
  const element = document.querySelector(".content");

  switch (true) {
    // do when radio encode button will pressed
    case getSelectionValue() === "encode":
      const encode = new Encode(textareaValue.value);

      // Check if any data is in session storage
      if (sessionStorage.getItem("data") === null) {
        source = [];
      } else {
        // get data from session storage and put in to variable
        source = JSON.parse(sessionStorage.getItem("data"));
      }
      // prevents to add empty string to array by pressing a button or refreshing a browser
      if (textareaValue.value.length > 0) {
        // add to array as a JSON object
        source.push({ text: encode.text, class: "encode" });
      }
      // convert a value to a JSON string
      sessionStorage.setItem("data", JSON.stringify(source));

      // loop from source array to get data
      source.forEach((source) => {
        data += `
            <div class="content ${source.class}">
              <div class="content__message">${source.text}
              </div>
              <div class="content__btn">
                <div class="copy"> 
                  <i class="far fa-clipboard"></i>
                </div>
                <div class="delete">
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </div>
            `;
      });

      // inserting all data from local session as innerHTML to the DOM
      history.innerHTML = data;

      //clear textarea
      textareaValue.value = "";
      smoothScrollDown("scrollTo", 1000);
      break;

    // do when radio decode button will pressed
    case getSelectionValue() === "decode":
      const decode = new Decode(textareaValue.value);

      if (sessionStorage.getItem("data") === null) {
        source = [];
      } else {
        source = JSON.parse(sessionStorage.getItem("data"));
      }
      if (textareaValue.value.length > 0) {
        source.push({ text: decode.text, class: "decode" });
      }
      sessionStorage.setItem("data", JSON.stringify(source));

      // loop from source array to get data
      source.forEach((source) => {
        data += `
              <div class="content ${source.class}">
              <div class="content__message">${source.text}
              </div>
              <div class="content__btn">
                <div class="copy" title="Copy"> 
                  <i class="far fa-clipboard"></i>
                </div>
                <div class="delete" title="Delete">
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </div>
              `;
      });

      history.innerHTML = data;

      textareaValue.value = "";
      break;
  }
};

const smoothScrollDown = (target, duration) => {
  const select = document.getElementById(target);
  const targetPosition = select.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    let time = currentTime - startTime;
    const start = ease(time, startPosition, distance, duration);
    window.scrollTo(0, start);
    if (time < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 2) (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// check or get items from local session when browser will be refresh or loaded
const getItems = () => {
  base64();

  // issue all the time is scrolling page and animation is working on all content that is why in comment
};

// change the text according to the selected option
const changeBtnContent = (e) => {
  const getSelection = e.target.value;

  switch (true) {
    case getSelection == "encode":
      btn.textContent = "Encode";
      textareaText.textContent = "Encode the message";
      break;
    case getSelection == "decode":
      btn.textContent = "Decode";
      textareaText.textContent = "Decode the message";
      break;
  }
};

// remove from session storage
const removeDataFromSessionStorage = (dataItem) => {
  let source;

  // get data from session storage and put in to variable
  source = JSON.parse(sessionStorage.getItem("data"));

  for (let i = source.length - 1; i >= 0; i -= 1) {
    // compare if message from DOM and session storage are equel
    console.log(dataItem.innerText, source[i].text);
    console.log(dataItem.innerText === source[i].text);
    if (dataItem.innerText === source[i].text) {
      // if it dose delete selected item
      source.splice(i, 1);
    }
  }
  sessionStorage.setItem("data", JSON.stringify(source));
};

// remove specific element from DOM and session storage
const handleButtons = (e) => {
  // check if clicked elemnt contains a delete class
  if (e.target.classList.contains("delete")) {
    // select current parent
    const parent = e.target.parentElement.parentElement;
    // select current encode or decode message
    const child = e.target.parentElement.previousElementSibling;

    // set animations on a specific element
    parent.style.animationName = "delete";
    parent.style.animationDuration = ".3s";
    parent.style.animationTimingFunction = "ease-out";

    // transition deleting
    // deleteContent(parent);

    // remove element after animation will finsh
    setTimeout(() => {
      // remove from session storage
      removeDataFromSessionStorage(child);
      // remove from DOM
      parent.remove();
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

// listeners
(() => {
  // start encode or decode
  btn.addEventListener("click", base64);
  // select option
  [...radioBtn].map((item) =>
    item.addEventListener("change", changeBtnContent)
  );
  // load items from session if exist
  document.addEventListener("DOMContentLoaded", getItems);

  // remove data from DOM
  history.addEventListener("click", handleButtons);
})();
