import * as strophe from "strophe.js";

export default ({ app }: any, inject: any) => {
//     const chatServer = new Strophe.Connection('http://chat.beeda.com:5280/http-bind');
  inject('Strophe', strophe);
//   inject('ChatServer', 12);
}; 