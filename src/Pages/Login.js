import React, { useState } from 'react'
import {Col, Container, Row, Form, Button, Alert} from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./CSS/Signup.css"
import { useLoginMutation } from '../sevices/appApi'

const Login = () => {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [login, {isError, isLoading, error}] = useLoginMutation()

const handleLogin = (e) => {
    e.preventDefault();
    login({email, password})
}

  return (
    <Container>
        <Row>
            <Col md={6} className='login_form--container'>
                <Form style={{width:"100%"}} onSubmit={handleLogin}>
                    <h1>Login to your account</h1>
                
                    {isError && <Alert variant='danger'>{error.data.message}</Alert>}

                    <Form.Group className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control autoComplete="on" type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group>
                        <Button disabled={isLoading} type='submit'>Login</Button>
                    </Form.Group>

                    <p className='pt-3 text-center'>
                        Don't have an account? <Link to="/signup">Create account</Link>{" "}
                    </p>
                </Form>
            </Col>
            <Col md={6} className='login_image--container'></Col>
        </Row>
    </Container>
  )
}

export default Login