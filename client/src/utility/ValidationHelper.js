import { toast } from "sonner";

export function IsEmail(value) {
  let EmailRegx = /\S+@\S+\.\S+/;
  let validate = EmailRegx.test(value);
  if (!validate) {
    toast("Please enter a valid email");
    return false;
  }
  return true;
}
export function IsNumber(value) {
  let OnlyNumberRegx = /^\d+(\.\d+)?$/;
  return OnlyNumberRegx.test(value);
}
export function IsNull(value) {
  return value == null;
}
export function IsEmpty(value) {
  if (value.length === 0) {
    toast("Please fill all fields");
    return true;
  }
  return false;
}

export function IsPasswordMatch(password, confirmPassword) {
  if (password != confirmPassword) {
    toast("Password and Confirm Password should be same");
    return false;
  }
  return true;
}
