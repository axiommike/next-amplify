import { Auth } from "aws-amplify";
import SocialSignIn from "./SocialSignIn";
import Input from "./Input";

export default function SignIn({
  signIn,
  onChange,
  setUiState,
  errorMessage,
  resendCode,
}) {
  return (
    <div className="">
      <p className="text-3xl font-black">Sign In to Your Account</p>
      {errorMessage && (
        <>
          <div className="text-red-400 font-semibold p-3">{errorMessage}</div>
          {errorMessage === "User is not confirmed." && (
            <button
              className="rounded bg-salmon mt-2 text-white p-2"
              onClick={resendCode}
            >
              Resend Code
            </button>
          )}
        </>
      )}
      <div className="mt-10">
        <label className="text-sm">Email</label>
        <Input name="email" onChange={onChange} />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <Input name="password" onChange={onChange} type="password" />
      </div>
      <button
        onClick={signIn}
        className="text-white bg-mc-dark-blue w-full p-3 rounded mt-3"
      >
        Sign In
      </button>
      <SocialSignIn />
    </div>
  );
}
