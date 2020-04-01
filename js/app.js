import "../scss/index.scss";
import Encode from "./encoding";

// global variables
const items = document.querySelectorAll('input[name="radio_btn"]');
const textareaValue = document.getElementById("form-group__encoding");
const btn = document.getElementById("btn");
const div = document.querySelector(".history");

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

const base64 = () => {
  switch (true) {
    case getSelectionValue() == "encode":
      const encode = new Encode(textareaValue.value);

      div.appendChild(document.createTextNode(encode.text));

      textareaValue.value = "";
      break;
  }
};

// listener
(() => {
  btn.addEventListener("click", base64);
})();
