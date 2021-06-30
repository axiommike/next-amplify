import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ForgotPassword({
  forgotPasswordHandler,
  onChange,
  setUiState,
  errorMessage,
  resendCode,
}) {
  return (
    <div className="">
      <p className="text-3xl font-black">Password Reset</p>
      <p className="">
        Enter your email address to initiate a password reset. You will be sent
        a verification code.
      </p>
      {errorMessage && (
        <>
          <div className="font-semibold text-red-500">{errorMessage}</div>
          <button className="rounded bg-salmon mt-2 text-white p-2">
            Resend Code
          </button>
        </>
      )}
      <div className="mt-10">
        <label className="text-sm">Enter your email address:</label>
        <Input onChange={onChange} name="email" />
      </div>

      <button
        onClick={forgotPasswordHandler}
        className="text-white bg-mc-dark-blue w-full p-3 rounded mt-3"
      >
        Request Password Reset
      </button>
    </div>
  );
}
