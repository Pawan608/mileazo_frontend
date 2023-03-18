var SHA256 = require("crypto-js/sha256");
const crypt_Request = async (body) => {
  //   console.log(SHA256(body));
  const encrypted = await SHA256(body).toString();
  console.log(encrypted);
  //
};
export default crypt_Request;
