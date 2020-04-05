import "../scss/index.scss";
import Encode from "./encoding";
import Decode from "./decoding";

// global variables
const items = document.querySelectorAll('input[name="radio_btn"]');
const textareaValue = document.getElementById("form-group__textarea");
const btn = document.getElementById("btn");
const history = document.querySelector(".history");
const textareaText = document.querySelector(".form-group__label");
// local session encode values
let source;

// this function return what option is selected from radio input
const getSelectionValue = () => {
  let value;

  for (let i = 0; i < items.length; i++) {
    if (items[i].checked) {
      value = items[i].value;

      break;
    }
  }

  return value;
};

// main function that use class to encode and decode a string
const base64 = () => {
  switch (true) {
    case getSelectionValue() == "encode":
      const encode = new Encode(textareaValue.value);

      // put in history block
      history.appendChild(document.createTextNode(encode.text));

      // set session storage encode item
      if (sessionStorage.getItem("encode") === null) {
        source = [];
      } else {
        source = JSON.parse(sessionStorage.getItem("encode"));
      }

      source.push(encode.text);
      sessionStorage.setItem("encode", JSON.stringify(source));

      textareaValue.value = "";

      break;
    case getSelectionValue() == "decode":
      const decode = new Decode(textareaValue.value);

      history.appendChild(document.createTextNode(decode.text));

      textareaValue.value = "";
      break;
  }
};

// get items from local session
const getItems = () => {
  if (sessionStorage.getItem("encode") === null) return;

  const sources = JSON.parse(sessionStorage.getItem("encode"));

  sources.forEach((source) => {
    history.appendChild(document.createTextNode(source));
  });
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

// listeners
(() => {
  btn.addEventListener("click", base64);
  [...items].map((item) => item.addEventListener("change", changeBtnContent));
  // load items from session if exist
  document.addEventListener("DOMContentLoaded", getItems);
})();
