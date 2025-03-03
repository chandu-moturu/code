import axios from 'axios'
import React, { useContext, useState } from 'react'
import { EmpContext } from '../../context/EmpContext'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import './login.css'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = `http://localhost:5000/api`;

  const { setEToken } = useContext(EmpContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {
      // console.log(backendUrl)

      const { data } = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });
      console.log(data)
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(`${backendUrl}/emp/login`, { email, password })
      if (data.success) {
        setEToken(data.token)
        localStorage.setItem('eToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <div className="login-main">
      <form onSubmit={onSubmitHandler}>
        <h1>
          <span>{state}</span> Login
        </h1>
        <div className="login-container">
          <div>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
            />
          </div>
          <div>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
            />
          </div>
          <div>
            <button>Login</button>
          </div>
          <div>
            {state === "Admin" ? (
              <p>
                Emp Login?{" "}
                <span onClick={() => setState("Emp")}>Click here</span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span onClick={() => setState("Admin")}>Click here</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login