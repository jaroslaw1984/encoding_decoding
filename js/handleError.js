// This function warns the user that he cannot decode the message if it is not encoded

const handleError = () => {
  if (document.querySelector(".error")) return;

  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const parentDiv = document.createElement("div");
  const childDiv = document.createElement("div");
  const p = document.createElement("p");
  const i = document.createElement("i");
  const button = document.createElement("button");
  const warrning = "You cannot decode the message if it is not encoded yet";

  button.setAttribute("class", "errBtn");
  button.appendChild(document.createTextNode("OK"));
  p.appendChild(document.createTextNode(warrning));
  childDiv.appendChild(p);
  childDiv.appendChild(i);
  parentDiv.appendChild(childDiv);
  parentDiv.appendChild(button);
  i.setAttribute("class", "fas fa-exclamation-circle");
  parentDiv.setAttribute("class", "error");
  parentDiv.setAttribute("style", "animation: show .5s ease");
  childDiv.setAttribute("class", "warrning");
  body.insertBefore(parentDiv, header);

  button.addEventListener("click", () => {
    parentDiv.setAttribute("style", "animation: hide .5s ease");
    setTimeout(() => {
      parentDiv.remove(parentDiv);
    }, 500);
  });
};

export default handleError;
