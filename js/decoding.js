export default class Decoding {
  constructor(text = "") {
    this.text = text !== "" ? this.decode(text) : null;
  }
  decode(value) {
    const decodeStr = decodeURIComponent(
      atob(value)
        .split("")
        .map(c => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return decodeStr;
  }
}
