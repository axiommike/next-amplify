import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ForgotPasswordSubmit({
  forgotPasswordSubmitHandler,
  onChange,
  setUiState,
  errorMessage,
  resendCode,
}) {
  console.log("FPS: " + forgotPasswordSubmitHandler);
  return (
    <div className="">
      <p className="text-3xl font-black">Password Reset</p>
      <p className="mt-3">
        A verification code has been sent to the email provided. Please enter
        the code along with your new password and you will be redirected to the
        Login Screen.
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
        <label className="text-sm">Confirmation Code:</label>
        <Input onChange={onChange} name="authCode" />
      </div>
      {/* <div className="mt-10">
        <label className="text-sm">Enter your email address:</label>
        <Input onChange={onChange} name="email" />
      </div> */}
      <div className="mt-10">
        <label className="text-sm">New Password:</label>
        <Input onChange={onChange} name="password" />
      </div>

      <button
        onClick={forgotPasswordSubmitHandler}
        className="text-white bg-mc-dark-blue w-full p-3 rounded mt-3"
      >
        Reset Password
      </button>
    </div>
  );
}
