import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import styled from 'styled-components';

const DivStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputStyles = styled.input`
  padding: 20px 80px;
  margin: 20px;
  border: 2px solid #F59BAE;
  border-radius: 20px;
`;
const ButtonStyles = styled.button`
  padding: 20px 20px;
  background: #9BF5C5;
  border-radius: 40px;
`;

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
const [info, setInfo] = useState({ 
    username: '',
    password: ''
  });

const handleChange = e => {
  setInfo({...info, 
    [e.target.name]: e.target.value});
;}

const loginPost = e => {
  e.preventDefault();
    axiosWithAuth()
      .post('/api/login', info)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => {
        console.log('Login Error found', err)
      });
};


  return (
    <DivStyles>
       <h1>BUBBLES BUBBLES EVERWHERE!!!!!!</h1>
          <form onSubmit={loginPost}>
            <InputStyles
                type='text'
                name='username'
                placeholder='Username'
                value={info.username}
                onChange={handleChange}
              />
              <InputStyles
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={info.password}
                  onChange={handleChange}
                />
            <ButtonStyles type='submit'>Login</ButtonStyles>
          </form>
    </DivStyles>
  );
};

export default Login;
