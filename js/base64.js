import Encode from "./encoding";
import Decode from "./decoding";
import smoothScrollDown from "./scroll";

// global variables
const btn = document.getElementById("btn");

// main function that use class to encode and decode a string
const base64 = () => {
  const radioBtn = document.querySelectorAll('input[name="radio_btn"]');
  const textareaValue = document.getElementById("form-group__textarea");
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

  //
  const selectOption = (option) => {
    //set a class depend what option value is pass
    let select;

    // local session encode array values
    let source;

    // put all data from session storage to DOM
    let data = "";

    // check what option is pass in attribute
    option === "encode"
      ? (select = new Encode(textareaValue.value))
      : (select = new Decode(textareaValue.value));

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
      source.push({ text: select.text, class: `${option}` });
      // and scroll down to the bottom when message is under height: 100vh
      smoothScrollDown("scrollTo", 1000);
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
  };

  switch (true) {
    // do when radio encode button will pressed
    case getSelectionValue() === "encode":
      selectOption("encode");
      break;

    // do when radio decode button will pressed
    case getSelectionValue() === "decode":
      selectOption("decode");
      break;
  }
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

  // select option
  [...radioBtn].map((item) =>
    item.addEventListener("change", changeBtnContent)
  );
};

// start encode or decode
btn.addEventListener("click", base64);

export default base64;
