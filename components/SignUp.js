import { Auth } from "aws-amplify";
import SocialSignIn from "./SocialSignIn";
import Input from "./Input";

export default function SignUp({ signUp, onChange, setUiState, errorMessage }) {
  return (
    <div className="">
      <p className="text-3xl font-black">Sign Up For An Account</p>
      {errorMessage && (
        <div className="text-red-400 font-semibold p-3">{errorMessage}</div>
      )}
      <div className="mt-10">
        <label className="text-sm">Email</label>
        <Input onChange={onChange} name="email" />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <Input onChange={onChange} name="password" type="password" />
      </div>
      <button
        onClick={signUp}
        className="text-white bg-mc-dark-blue w-full p-3 rounded mt-3"
      >
        Sign Up
      </button>
    </div>
  );
}
