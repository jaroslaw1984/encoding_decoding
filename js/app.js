import "../scss/index.scss";
import Encode from "./encoding";
import Decode from "./decoding";

// global variables
const items = document.querySelectorAll('input[name="radio_btn"]');
const textareaValue = document.getElementById("form-group__encoding");
const btn = document.getElementById("btn");
const div = document.querySelector(".history");

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

      div.appendChild(document.createTextNode(encode.text));

      textareaValue.value = "";
      break;
    case getSelectionValue() == "decode":
      const decode = new Decode(textareaValue.value);

      div.appendChild(document.createTextNode(decode.text));

      textareaValue.value = "";
      break;
  }
};

// change the text according to the selected option
const changeBtnContent = e => {
  const getSelection = e.target.value;

  switch (true) {
    case getSelection == "encode":
      btn.textContent = "Encode";
      break;
    case getSelection == "decode":
      btn.textContent = "Decode";
      break;
  }
};

// listeners
(() => {
  btn.addEventListener("click", base64);
  [...items].map(item => item.addEventListener("change", changeBtnContent));
})();
