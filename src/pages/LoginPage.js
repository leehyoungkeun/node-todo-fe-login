import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";


const LoginPage = () => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState('')
  const[user, setUser] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async(event) => {
    event.preventDefault()
    setError('') // 에러 초기화

    try{
      const response = await api.post('/user/login',{email, password})
      if (response.status === 200 ) {
        setUser(response.data.user)       
        sessionStorage.setItem("token", response.data.token)
        api.defaults.headers['authorization']="Bearer " + response.data.token
        //seteooro(')
        navigate('/')
        return // 성공 시 함수 종료
      }
    }catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      console.error("Login error:", error);      
    }
  }

  return (
    <div className="display-center">
      {error && <div className='red-error'> {error} </div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}  />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
