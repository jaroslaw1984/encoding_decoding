// This function warns the user that he cannot decode the message if it is not encoded

const handleError = () => {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const warrning = "You cannot decode the message if it is not encoded yet";

  button.setAttribute("class", "errBtn");
  button.appendChild(document.createTextNode("OK"));
  p.appendChild(document.createTextNode(warrning));
  div.appendChild(p);
  div.appendChild(button);
  div.setAttribute("class", "error");
  div.setAttribute("style", "animation: show .5s ease");
  body.insertBefore(div, header);

  button.addEventListener("click", () => {
    div.setAttribute("style", "animation: hide .5s ease");
    setTimeout(() => {
      div.remove(div);
    }, 500);
  });
};

export default handleError;
