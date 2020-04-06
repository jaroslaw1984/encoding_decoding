export default class Encoding {
  constructor(text) {
    this.text = text = this.encode(text);
  }
  encode(value) {
    const encodedStr = btoa(
      encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode("0x" + p1);
      })
    );

    return encodedStr;
  }
}
