import { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import Auth from "@aws-amplify/auth";
import Profile from "../components/Profile";
import ForgotPassword from "../components/ForgotPassword";
import ForgotPasswordSubmit from "../components/ForgotPasswordSubmit";
import LoadingOverlay from "react-loading-overlay";

function Login({ user3, error, mode }) {
  const [uiState, setUiState] = useState("signIn");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    authCode: "",
  });

  const { email, password, authCode } = formState;
  useEffect(() => {
    getUser();
  }, []);

  async function signInHandler() {
    try {
      setUiState("loading");
      setUser(await Auth.signIn(email, password));
      setErrorMessage();
      setUiState("signedIn");
    } catch (err) {
      setErrorMessage(err.message);
      setUiState("signIn");
    }
  }

  async function signUpHandler() {
    try {
      setUiState("loading");
      await Auth.signUp({ username: email, password, attributes: { email } });
      setErrorMessage();
      setUiState("confirmSignUp");
    } catch (err) {
      setErrorMessage(err.message);
      setUiState("signUp");
    }
  }

  async function confirmSignUpHandler() {
    try {
      setUiState("loading");
      await Auth.confirmSignUp(email, authCode);
      await Auth.signIn(email, password);
      setErrorMessage();
      setUiState("signedIn");
    } catch (err) {
      setErrorMessage(err.message);
      setUiState("confirmSignUp");
    }
  }

  async function forgotPasswordSubmitHandler() {
    try {
      setUiState("loading");
      await Auth.forgotPasswordSubmit(email, authCode, password);
      setErrorMessage();
      setUiState("signIn");
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  async function forgotPasswordHandler() {
    try {
      setUiState("loading");
      await Auth.forgotPassword(email);
      setErrorMessage();
      setUiState("forgotPasswordSubmit");
    } catch (err) {
      setErrorMessage(err.message);
      setUiState("resetPass");
    }
  }

  async function resendCode() {
    try {
      setUiState("loading");
      await Auth.resendSignUp(email);
      setErrorMessage();
      setUiState("confirmSignUp");
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  async function getUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setUiState("signedIn");
    } catch (err) {
      return { error: err };
    }
  }

  function onChangeHandler(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  return (
    <>
      <LoadingOverlay
        active={uiState === "loading"}
        spinner
        text="Hang on a sec..."
        className="h-screen"
      >
        {uiState === "signedIn" && (
          <Profile user={user} setUiState={setUiState} />
        )}
        {/* Create tabs for SignIn, SignUp and ResetPassword */}
        {uiState !== "signedIn" && (
          <>
            <nav className="flex flex-col sm:flex-row w-1/3 mt-4 mx-auto bg-white rounded-t-lg">
              <button
                onClick={() => {
                  setUiState("signIn");
                  setErrorMessage("");
                }}
                className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none rounded-t-lg ${
                  uiState === "signIn" ? "bg-gray-200" : "bg-gray-50"
                } border-t font-medium`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setUiState("signUp");
                  setErrorMessage("");
                }}
                className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none rounded-t-lg ${
                  uiState === "signUp" ? "bg-gray-200" : "bg-gray-50"
                } border-t font-medium`}
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setUiState("resetPass");
                  setErrorMessage("");
                }}
                className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none rounded-t-lg ${
                  uiState === "resetPass" ? "bg-gray-200" : "bg-gray-50"
                } border-t font-medium`}
              >
                Reset Password
              </button>
            </nav>
            {/* Display appropriate form based on uiState */}
            <div className="w-1/3 mx-auto bg-white shadow-xl  rounded-b-lg">
              <div className="p-8">
                {uiState === "signIn" && (
                  <SignIn
                    signIn={signInHandler}
                    onChange={onChangeHandler}
                    setUiState={setUiState}
                    errorMessage={errorMessage}
                    resendCode={resendCode}
                  />
                )}
                {uiState === "confirmSignUp" && (
                  <ConfirmSignUp
                    confirmSignUp={confirmSignUpHandler}
                    onChange={onChangeHandler}
                    setUiState={setUiState}
                    errorMessage={errorMessage}
                    resendCode={resendCode}
                  />
                )}
                {uiState === "signUp" && (
                  <SignUp
                    signUp={signUpHandler}
                    onChange={onChangeHandler}
                    setUiState={setUiState}
                    errorMessage={errorMessage}
                  />
                )}
                {uiState === "resetPass" && (
                  <ForgotPassword
                    forgotPasswordHandler={forgotPasswordHandler}
                    onChange={onChangeHandler}
                    setUiState={setUiState}
                    errorMessage={errorMessage}
                  />
                )}
                {uiState === "forgotPasswordSubmit" && (
                  <ForgotPasswordSubmit
                    forgotPasswordSubmitHandler={forgotPasswordSubmitHandler}
                    onChange={onChangeHandler}
                    setUiState={setUiState}
                    errorMessage={errorMessage}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </LoadingOverlay>
    </>
  );
}
export default Login;
