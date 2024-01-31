import biproto from "../src";
const data = { text: "something" };


// encode data
const requestPacket = biproto.request("testMethod", data);
console.log(`Request packet: ${requestPacket.byteLength}`);

// decode request
const decodedRequest = biproto.parse(requestPacket);
console.log(`Decoded packet:`, decodedRequest);

// encode response
const responsePacket = biproto.response(decodedRequest.id, decodedRequest.data);
console.log(`Response packet: ${responsePacket.byteLength}`);

// decode response
const decodedResponse = biproto.parse(responsePacket);
console.log(`Decoded response:`, decodedResponse);