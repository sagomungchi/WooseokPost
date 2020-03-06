import react, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Input, Col, Row } from 'antd';

const signup = () => {

    const [Id, setId] = useState('');
    const [NickName, setNickName] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordCheck, setPasswordCheck] = useState('');

    const ohChangeId = useCallback((e) => {
        setId(e.target.value)
    }, [Id]);

    const onChagePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [Password]);

    return (
        <div style={{ marginTop: '10%', fontFamily: 'Dancing Script, cursive' }}>
            <Row>
                <Col sm={8} xs={6}></Col>
                <Col sm={8} xs={12}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10%' }}>By 4Makers</h1>
                    <p style={{ marginBottom: '1px' }}><b>ID</b></p>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={ohChangeId} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px' }}><b>NickName</b></p>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={ohChangeId} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px' }}><b>Password</b></p>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={onChagePassword}></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px' }}><b>Password Check</b></p>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={onChagePassword}></Input>
                    <br /> <br /> <br /> <br />
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '20px', display: 'inline', cursor: 'pointer' }}>Confirm</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href='/'><a><p style={{ fontSize: '20px', display: 'inline', color: 'black' }}>Index</p></a></Link>

                    </div>
                </Col>
                <Col sm={8} xs={6}></Col>
            </Row>
        </div>
    )
}

export default signup;