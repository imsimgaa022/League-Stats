import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions';
import { Button, Col, Form, Input, Row } from "antd"

function Login() {
  const dispatch = useDispatch();

  const handleFinish = (values) => {
    const payload = {
      email: values?.email,
      password: values?.password
    };

    dispatch(loginUser(payload));
  };

  return (
      <Row style={{minHeight: "calc(100vh - 57px)", borderTop: "1px solid white"}}>
        <Col span={16} style={{background: "black", overflow: "hidden"}}>
          <img alt='' className='auth-image' style={{objectFit: "cover"}} width={"100%"} height="100%" src='https://cdna.artstation.com/p/assets/images/images/006/157/822/large/mo-yan-darkstar-final.jpg?1496428723'/>
        </Col>
        <Col span={8} style={{background: "black", display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column", borderLeft: "1px solid white"}}>
          <h2 className='michroma-font' style={{color: "white"}}>Login</h2>
          <div style={{background: "url('/favicon.ico')", height:"50px", width: "50px", backgroundSize: "cover", borderRadius: "30%"}}></div>
          <Form style={{width: "65%"}} className='register-form' layout='vertical' onFinish={handleFinish}>
            <Form.Item rules={[{required: true, message: "This field is required!"}]} name={"email"} label="Email">
              <Input/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: "This field is required!"}]} name={"password"} label="Passowrd">
              <Input type={"password"}/>
            </Form.Item>
            <Button className='michroma-font' htmlType='submit'>Login</Button>
          </Form>
        </Col>
      </Row>
  );
}

export default Login;
