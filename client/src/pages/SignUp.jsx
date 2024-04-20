import { Alert, Button,  Spinner, Label,TextInput } from "flowbite-react"
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom"
import {OAuth} from "../components/OAuth.jsx";
export default function SignUp() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

  }
  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(!formData.email || !formData.username || !formData.password){
      return setErrorMessage("All fields are required!");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/sign-up', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if(data.success===false){
        setLoading(false)
        return setErrorMessage(data.message);
      }
      if(res.ok){
        navigate('/sign-in');
      }
      setLoading(false);


      
    } catch (error) {
      console.log('Fetch error',error);
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-black text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white">Saqib`s</span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">You can sign up with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              {/* <FloatingLabel variant="standard" lable="Username" type="text" id="username" onChange={handleChange} /> */}
              <Label color='black' value="username" />
              <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
            </div>
            <div>
            {/* <FloatingLabel  variant="standard" lable="Email" type="email" id="email" onChange={handleChange} /> */}
              <Label color='black' value="email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
            {/* <FloatingLabel variant="standard" lable="Password" type="password" id="password" onChange={handleChange} /> */}
              <Label color='black' value="password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>{
              loading ? (
                <>
                  <Spinner className="sm"/>
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign Up'
            }</Button>
            <OAuth/>
          </form>
          <div className="mt-2 ml-2 text-sm flex gap-1">
            <span>Already have an account?</span>
            <Link to='/sign-in' className="text-blue-600">Sign-in</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-3" color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
