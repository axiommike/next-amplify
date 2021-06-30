import { Auth } from "aws-amplify";
import SocialSignIn from "./SocialSignIn";
import Input from "./Input";

export default function ConfirmSignUp({
  confirmSignUp,
  onChange,
  setUiState,
  errorMessage,
  resendCode,
}) {
  return (
    <div className="">
      <p className="text-3xl font-black">Confirm Your Account</p>
      {errorMessage && (
        <>
          <div className="font-semibold text-red-500">{errorMessage}</div>
          <button className="rounded bg-salmon mt-2 text-white p-2">
            Resend Code
          </button>
        </>
      )}
      <div className="mt-10">
        <label className="text-sm">Confirmation Code:</label>
        <Input onChange={onChange} name="authCode" />
      </div>

      <button
        onClick={confirmSignUp}
        className="text-white bg-mc-dark-blue w-full p-3 rounded mt-3"
      >
        Confirm Sign Up
      </button>
    </div>
  );
}
