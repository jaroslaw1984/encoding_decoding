import "../scss/index.scss";
import { base64, changeBtnContent, getSelectionValue } from "./base64";
import handleButtonsMsg from "./handleButtonsMsg";
import { language, handleChangeLang } from "./language";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// global variables
const btn = document.getElementById("btn");
const radioBtn = document.querySelectorAll('input[name="radio_btn"]');
const history = document.querySelector(".history");
const langs = document.querySelectorAll('input[name="lang"]');

// check or get items from local session when browser will be refresh or loaded
const getItems = () => {
  /* ----------------------------------------------- */
  // this section only start when page is load, refresh or last element will be delete from session storage
  const section = document.getElementsByTagName("section")[2];
  const h3 = document.querySelector(".noData");
  const historyTitle = document.getElementById("history__title");
  const encode = document.querySelector(".options__encode");
  const decode = document.querySelector(".options__decode");
  const h1 = document.querySelector("h1");
  const textareaText = document.querySelector(".form-group__label");
  const imgPl = document.querySelector(".langs_pl > img");
  const imgEn = document.querySelector(".langs_en > img");

  // put all data from session storage to DOM
  let data = "";

  // local session encode array values
  let source;

  // Check if any data is in session storage
  if (sessionStorage.getItem("data") === null) {
    source = [];
  } else {
    // get data from session storage and put in to variable
    source = JSON.parse(sessionStorage.getItem("data"));
  }

  // loop from source array to get data
  source.forEach((source) => {
    data += `
      <div class="content ${source.class}">
        <div class="content__message">${source.text}</div>
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

  // inserting all data from local session as innerHTML in to the DOM
  history.innerHTML = data;

  //check what language is set, then change all text for chosen language
  encode.textContent = language() === "pl" ? "Zakoduj" : "Encode";
  decode.textContent = language() === "pl" ? "Odszyfruj" : "Decode";
  historyTitle.textContent =
    language() === "pl" ? "Historia wiadomości:" : "Messages history:";
  h1.textContent =
    language() === "pl"
      ? "Kodowanie i dekodowanie w JavaScript za pomocą Base64"
      : "Base64 encoding and decoding in JavaScrip";

  // program need to check what value is selected encode or decode to change correctly between textcontent
  if (getSelectionValue() === "encode") {
    btn.textContent = language() === "pl" ? "Zakoduj" : "Encode";
    textareaText.textContent =
      language() === "pl" ? "Zakoduj wiadomość" : "Encode the message";
  } else {
    btn.textContent = language() === "pl" ? "Odszyfruj" : "Decode";
    textareaText.textContent =
      language() === "pl" ? "Dekoduj wiadomość" : "Decode the message";
  }

  // set filter on not used language
  if (language() === "en") {
    imgPl.setAttribute("style", "filter: grayscale(100%)");
  } else if (language() === "pl") {
    imgEn.setAttribute("style", "filter: grayscale(100%)");
  }

  // set title if history content is empty on load
  if (history.firstElementChild === null) {
    //create this element when history is empty
    const h3 = document.createElement("h3");
    h3.setAttribute("class", "noData");
    const text =
      language() === "pl"
        ? "Nie ma nic do wyświetlenia"
        : "There is nothing to display";

    h3.appendChild(document.createTextNode(text));

    section.appendChild(h3);
  } else if (h3) {
    // if h3 exist remove it
    h3.remove(h3);
  }
};

// load items from session if exist
document.addEventListener("DOMContentLoaded", getItems);

// handle buttons that allow to remove data and copy message
history.addEventListener("click", handleButtonsMsg);

// start encode or decode
btn.addEventListener("click", base64);

// select option
[...radioBtn].map((item) => item.addEventListener("change", changeBtnContent));

[...langs].map((lang) => lang.addEventListener("change", handleChangeLang));
