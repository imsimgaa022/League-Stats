import { Button, Col, Form, Input, Row, notification } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions';

function Register() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Registration Completed!',
      description:
        'Verification email has been sent to you! Please verify your email before login!',
    });
  };

  const handleFinish = (values) => {
    const payload = {
      email: values?.email,
      password: values?.password,
      handleNotification: () => openNotificationWithIcon('success'),
    };

    dispatch(registerUser(payload));
  };

  return (
      <Row style={{minHeight: "calc(100vh - 57px)", borderTop: "1px solid white"}}>
        {contextHolder}
        <Col span={8} style={{background: "black", display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column", borderRight: "1px solid white"}}>
          <h2 className='michroma-font' style={{color: "white"}}>Register</h2>
          <div style={{background: "url('/favicon.ico')", height:"50px", width: "50px", backgroundSize: "cover", borderRadius: "30%"}}></div>
          <Form style={{width: "65%"}} className='register-form' layout='vertical' onFinish={handleFinish}>
          <Form.Item rules={[{required: true, message: "This field is required!"}]} name={"email"} label="Email">
              <Input/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: "This field is required!"}]} name={"password"} label="Passowrd">
              <Input type={"password"}/>
            </Form.Item>
            <div>
              <Button className='michroma-font' htmlType='submit'>Register</Button>
            </div>
          </Form>
        </Col>
        <Col span={16} style={{background: "black", overflow: "hidden"}}>
          <img alt='' className='auth-image' style={{objectFit: "cover"}} width={"100%"} height="100%" src='https://cdna.artstation.com/p/assets/images/images/006/157/822/large/mo-yan-darkstar-final.jpg?1496428723'/>
        </Col>
      </Row>
  );
}

export default Register;
