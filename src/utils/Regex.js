import {String} from './String';

export const Regex = (type, text) => {
  console.log(text);
  const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const phoneRegex = /^\d{10}$/; // ✅ Fixed: Changed `d{10}` to `\d{10}`

  let reg =
    type == String?.email
      ? emailRegex
      : type == String?.phone
      ? phoneRegex
      : type == String?.password
      ? passwordRegex
      : '';

  if (reg.test(text) === false) {
    console.log(`${type} is not Correct`);
    return false;
  } else {
    console.log(`${type} is Correct`);
    return true;
  }
};
