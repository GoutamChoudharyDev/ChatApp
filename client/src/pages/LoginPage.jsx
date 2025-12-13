import { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  // Use States
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if(currState === "Sign up" && !isDataSubmitted){
      setIsDataSubmitted(true);
    
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly
    max-sm:flex-col backdrop-blur-2xl'>

      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw, 250px]' />

      {/* right */}
      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6
      flex flex-col gap-6 rounded-lg shadow-lg'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
        </h2>

        {/* Note : if currstate is sign up then this field show*/}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            placeholder='Full Name'
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='p-2 border border-y-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        )}

        <button
          onClick={() => setIsDataSubmitted(true)}
          className="py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account?
              <span
                onClick={() => { setCurrState("Login") }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>Don't have account?
              <span
                onClick={() => { setCurrState("Sign up") }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>

    </div>
  )
}

export default LoginPage
