import "../scss/index.scss";
import { base64, changeBtnContent } from "./base64";
import handleButtonsMsg from "./handleButtonsMsg";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// global variables
const btn = document.getElementById("btn");
const radioBtn = document.querySelectorAll('input[name="radio_btn"]');
const history = document.querySelector(".history");

// check or get items from local session when browser will be refresh or loaded
const getItems = () => {
  /* ----------------------------------------------- */
  // this section only start when page is load, refresh or last element will be delete from session storage
  const section = document.getElementsByTagName("section")[1];
  const h3 = document.querySelector(".noData");

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

  // set title if history content is empty on load
  if (history.firstElementChild === null) {
    //create this element when history is empty
    const h3 = document.createElement("h3");
    h3.setAttribute("class", "noData");
    const text = "There is nothing to display";

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
