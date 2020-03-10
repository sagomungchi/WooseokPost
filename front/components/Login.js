import React, { useState, useCallback } from 'react'
import Link from 'next/link';
import { Row, Col, Input } from 'antd';
import axois from 'axios';

const login = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const ohChangeId = useCallback((e) => {
        setUserId(e.target.value)
    }, [userId]);

    const onChagePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [password]);

    const LoginOnClick = () => { //로그인시도
        try {
            console.log('hilogin')
            if (userId !== '' && password !== '') {
                axois
                .post(`http://localhost:3065/api/user/login`, {
                    userId : userId,
                    password : password,
                })
                .then(res=>{
                    if(res.status === 200){ //로그인 성공이면
                        props.setLogin(true);
                    }
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Row style={{ marginTop: '10%' }}>
            <Col sm={8} xs={6}></Col>
            <Col sm={8} xs={12}>
                <h1 style={{ textAlign: 'center', marginBottom: '20%' }}>By 4Makers</h1>
                <p style={{ marginBottom: '1px' }}><b>ID</b></p>
                <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={ohChangeId} ></Input>
                <br /> <br /> <br />
                <p style={{ marginBottom: '1px' }}><b>Password</b></p>
                <Input.Password style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onPressEnter={LoginOnClick} onChange={onChagePassword}></Input.Password>
                <br /> <br /> <br /> <br />
                <div style={{ textAlign: 'center' }}>
                    <p onClick={LoginOnClick} style={{ fontSize: '20px', display: 'inline', cursor: 'pointer' }}>Login</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href='/signup'><a><p style={{ fontSize: '20px', display: 'inline', color: 'black' }}>SignUp</p></a></Link>
                </div>
            </Col>
            <Col sm={8} xs={6}></Col>
        </Row>
    )
}

export default login;