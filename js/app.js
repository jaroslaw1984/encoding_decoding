import "../scss/index.scss";

const str = "Hello";

const encodedStr = btoa(str);

console.log(encodedStr);

const encode =
  "SmVzdCB0byBiYXJkem8gZmFqbnkgcHJvZ3JhbSBkbyBwcnplY2hvd2FuaWEgaSB1a3J5d2FuaWEgZGFueWNo";

const str2 = atob(encodedStr);

console.log(str2);
