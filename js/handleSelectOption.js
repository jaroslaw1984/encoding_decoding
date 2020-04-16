import Encode from "./Encode";
import Decode from "./Decode";
import smoothScrollDown from "./scroll";

// this function is a main program that use object Encode.js and Decode.js to encode and decode message
const handleSelectOption = (type) => {
  const textarea = document.getElementById("form-group__textarea");
  const history = document.querySelector(".history");

  // this variable will get new object depends what type is pass
  let select;

  // local session encode array values
  let source;

  // put all data from session storage to DOM
  let data = "";

  //use a object depend what option value is pass
  type === "encode"
    ? (select = new Encode(textarea.value))
    : (select = new Decode(textarea.value));

  // Check if any data is in session storage
  if (sessionStorage.getItem("data") === null) {
    source = [];
  } else {
    // get data from session storage and put in to variable
    source = JSON.parse(sessionStorage.getItem("data"));
  }
  // prevents to add empty string to array by pressing a button or refreshing a browser
  if (textarea.value.length > 0) {
    const h3 = document.querySelector(".noData");

    // add to array as a JSON object
    source.push({ text: select.text, class: `${type}` });
    // and scroll down to the bottom when message is under height: 100vh
    smoothScrollDown("scrollTo", 1000);

    // if h3 element exists in history then delete it
    if (h3) h3.remove();
  }
  // convert a value to a JSON string
  sessionStorage.setItem("data", JSON.stringify(source));

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

  //clear textarea
  textarea.value = "";
};

export default handleSelectOption;
