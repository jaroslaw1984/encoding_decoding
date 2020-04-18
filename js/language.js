import { getSelectionValue } from "./base64";

export const language = () => {
  const lang = document.querySelectorAll('input[name="lang"]');
  let isLangPl;

  for (let i = 0; i < lang.length; i++) {
    if (lang[i].checked) {
      if (lang[i].value === "pl") {
        isLangPl = "pl";
      } else {
        isLangPl = "en";
      }
    }
  }
  return isLangPl;
};

export const handleChangeLang = () => {
  const h1 = document.querySelector("h1");
  const encode = document.querySelector(".options__encode");
  const decode = document.querySelector(".options__decode");
  const historyTitle = document.getElementById("history__title");
  const textareaText = document.querySelector(".form-group__label");
  const btn = document.getElementById("btn");
  const h3 = document.querySelector(".noData");
  const imgPl = document.querySelector(".langs_pl > img");
  const imgEn = document.querySelector(".langs_en > img");

  h1.textContent =
    language() === "pl"
      ? "Kodowanie i dekodowanie w JavaScript za pomocą Base64"
      : "Base64 encoding and decoding in JavaScrip";

  encode.textContent = language() === "pl" ? "Zakoduj" : "Encode";
  decode.textContent = language() === "pl" ? "Odszyfruj" : "Decode";

  historyTitle.textContent =
    language() === "pl" ? "Historia wiadomości:" : "Messages history:";

  h3.textContent =
    language() === "pl"
      ? "Nie ma nic do wyświetlenia"
      : "There is nothing to display";

  if (getSelectionValue() === "encode") {
    btn.textContent = language() === "pl" ? "Zakoduj" : "Encode";
    textareaText.textContent =
      language() === "pl" ? "Zakoduj wiadomość" : "Encode the message";
  } else {
    btn.textContent = language() === "pl" ? "Odszyfruj" : "Decode";
    textareaText.textContent =
      language() === "pl" ? "Dekoduj wiadomość" : "Decode the message";
  }

  if (language() === "en") {
    imgPl.setAttribute("style", "filter: grayscale(100%)");
    imgEn.removeAttribute("style");
  } else if (language() === "pl") {
    imgPl.removeAttribute("style");
    imgEn.setAttribute("style", "filter: grayscale(100%)");
  }
};
