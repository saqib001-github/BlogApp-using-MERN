import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom"
export default function SignIn() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

  }
  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(!formData.email || !formData.password){
      return setErrorMessage("All fields are required!");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/sign-in', {
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
        navigate('/');
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
          <p className="text-sm mt-5 ">Sign in with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <Label color='black' value="email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label color='black' value="password" />
              <TextInput
                type="password"
                placeholder="********"
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
              ) : 'Sign In'
            }</Button>
          </form>
          <div className="mt-2 ml-2 text-sm flex gap-1">
            <span>Create new account?</span>
            <Link to='/sign-up' className="text-blue-600">Sign-up</Link>
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
