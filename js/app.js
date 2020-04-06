import "../scss/index.scss";
import Encode from "./encoding";
import Decode from "./decoding";

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
  // local session encode values
  let source;
  // put all data from session storage to DOM
  let data = "";

  switch (true) {
    // do when radio encode button will pressed
    case getSelectionValue() == "encode":
      const encode = new Encode(textareaValue.value);

      // set session storage encode item
      if (sessionStorage.getItem("encode") === null) {
        source = [];
      } else {
        source = JSON.parse(sessionStorage.getItem("encode"));
      }
      // prevents to add empty string to array by pressing a button or refreshing a browser
      if (textareaValue.value.length > 0) source.push(encode.text);

      // convert a value to a JSON string
      sessionStorage.setItem("encode", JSON.stringify(source));

      // loop from source array to get data
      source.forEach((source) => {
        data += `
        <div class="content ${
          getSelectionValue() === "encode" ? "encode" : "decode"
        }">
        <div class="content__message">${source}</div>
        <div class="conetent__btn"></div>
        </div>
        `;
      });

      // inserting all data from local session as innerHTML to the DOM
      history.innerHTML = data;

      //clear textarea
      textareaValue.value = "";
      break;
    // do when radio decode button will pressed
    case getSelectionValue() == "decode":
      const decode = new Decode(textareaValue.value);

      history.appendChild(document.createTextNode(decode.text));

      textareaValue.value = "";
      break;
  }
};

// get items from local session when browser will be refresh
const getItems = () => {
  base64();
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
  [...radioBtn].map((item) =>
    item.addEventListener("change", changeBtnContent)
  );
  // load items from session if exist
  document.addEventListener("DOMContentLoaded", getItems);
})();
