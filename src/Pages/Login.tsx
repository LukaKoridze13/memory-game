import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API, REACT_APP_TOKEN } = process.env;

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (localStorage.getItem(REACT_APP_TOKEN || "") !== null) {
      navigate("/");
    }
  }, []);
  const ref = React.useRef<HTMLFormElement>(null);
  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    axios.get(`${REACT_APP_API}users/${user}`).then((res) => {
      if (res.data.length === 0) {
        setError("User not found");
      }else if (res.data[0].password !== password) {
        setError('Wrong Password')
      }else{
        localStorage.setItem(REACT_APP_TOKEN || "", user)
        navigate('/')
      }
    });
  }
  return (
    <div className="absolute w-screen h-screen bg-darkest top-0 left-0 flex  justify-center items-center">
      <form
        ref={ref}
        onSubmit={(e) => login(e)}
        className="flex flex-col justify-center items-center gap-6">
        {error !== "" && (
          <p className="font-bold text-xl text-darkwhite">{error}</p>
        )}
        <input
          onChange={(e) => {
            setUser(e.target.value);
          }}
          type="text"
          placeholder="user"
          className="px-4 py-2 rounded-lg bg-lightgrey font-bold"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded-lg bg-lightgrey font-bold"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-lightgrey font-bold">
          Login
        </button>
        <div className="flex w-full justify-around text-darkwhite font-bold">
          <p onClick={()=>{navigate('/register')}} className="cursor-pointer">Register</p>
          <p onClick={()=>{navigate('/')}} className="cursor-pointer">Home</p>
        </div>
      </form>
    </div>
  );
}
