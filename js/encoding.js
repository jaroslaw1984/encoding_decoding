export default class Encoding {
  constructor(text = "") {
    this.text = text !== "" ? this.encode(text) : null;
  }
  encode(value) {
    const encodedStr = btoa(value);

    return encodedStr;

    // const encode =
    //   "SmVzdCB0byBiYXJkem8gZmFqbnkgcHJvZ3JhbSBkbyBwcnplY2hvd2FuaWEgaSB1a3J5d2FuaWEgZGFueWNo";

    // const str2 = atob(encodedStr);

    // console.log(str2);
  }
}
