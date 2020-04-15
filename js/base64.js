import handleSelectOption from "./handleSelectOption";

// this function return what option is selected from radio input
const getSelectionValue = () => {
  const radioBtn = document.querySelectorAll('input[name="radio_btn"]');
  let value;

  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      value = radioBtn[i].value;

      break;
    }
  }

  return value;
};

export const base64 = () => {
  const h3 = document.querySelector(".noData");

  // if h3 element exists in history then delete it
  if (h3) h3.remove();

  switch (true) {
    // do when radio encode button will pressed
    case getSelectionValue() === "encode":
      handleSelectOption("encode");
      break;

    // do when radio decode button will pressed
    case getSelectionValue() === "decode":
      handleSelectOption("decode");
      break;
  }
};
// change the lebel textarea title according to the selected option
export const changeBtnContent = (e) => {
  const textareaText = document.querySelector(".form-group__label");
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
