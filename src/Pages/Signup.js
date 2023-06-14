import React, { useState } from 'react'
import {Col, Container, Row, Form, Button, Alert} from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./CSS/Signup.css"
import { useSignupMutation } from "../sevices/appApi"


const Signup = () => {

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [signup, { error, isLoading, isError }] = useSignupMutation();


const handleSignup = (e) => {
    e.preventDefault()
    signup({ name, email, password})
}

  return (
    <Container>
    <Row>
        <Col md={6} className='signup_form--container'>
            <Form style={{width:"100%"}} onSubmit={handleSignup}>
                <h1>Create an account</h1>
                {isError && <Alert variant='danger'>{error.data.message}</Alert>}

                <Form.Group  className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)} required />
                </Form.Group>

                <Form.Group  className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete="on" type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Button type='submit' disabled={isLoading}>Create Account</Button>
                </Form.Group>

                <p className='pt-3 text-center'>
                    Already having an account? <Link to="/login">Login here</Link>{" "}
                </p>
            </Form>
        </Col>
        <Col md={6} className='signup_image--container'></Col>
    </Row>
</Container>
  )
}

export default Signup