import { Auth } from "aws-amplify";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function SocialSignIn() {
  return (
    <div>
      <div className="flex flex-col">
        <button
          className="bg-white rounded w-96 mx-auto my-2"
          onClick={() => Auth.federatedSignIn({ provider: "Google" })}
        >
          <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
            
            <FaGoogle size="24" className="text-red-600 mr-2"></FaGoogle>
            <p>Sign In with Google</p>
          </div>
        </button>

        <button
          className=" w-96 mx-auto my-2"
          onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
        >
          <div className='flex border border-gray-300 p-2 rounded-full items-center justify-center'><FaFacebook size="24" className="text-blue-600 mr-2"></FaFacebook><p>Sign In with FaceBook</p></div>
        </button>
      </div>
    </div>
  );
}
