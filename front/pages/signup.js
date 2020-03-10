import react, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Input, Col, Row, Checkbox } from 'antd';

const signup = () => {

    const [Id, setId] = useState('');
    const [NickName, setNickName] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordCheck, setPasswordCheck] = useState('');
    const [IdCheck, setIdCheck] = useState(false);
    const [NickNameCheck, setNickNameCheck] = useState(false);

    const ohChangeId = useCallback((e) => {
        setId(e.target.value)
        setIdCheck(false)
    }, [Id]);

    const ohChangeNickName = useCallback((e) => {
        setNickName(e.target.value)
        setNickNameCheck(false)
    }, [NickName]);

    const onChagePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [Password]);

    const onChagePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
    }, [PasswordCheck]);

    const onClickIdCheck = (e) => { //아이디 중복 확인
        //중복이면 

        //중복이 아니면
        setIdCheck(true)
    }
    const onClickNickNameCheck = (e) => { //닉네임 중복 확인
        //중복이면

        //중복이아니면

    }
    const onClickConfirm = () => { //회원가입 완료
                                        //아이디 중복체크 확인
                                        //닉네임 중복체크 확인
        if(Password === PasswordCheck){ //비밀번호 동일

        }
    }

    return (
        <div style={{ marginTop: '10%', fontFamily: 'Dancing Script, cursive' }}>
            <Row>
                <Col sm={8} xs={6}></Col>
                <Col sm={8} xs={12}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10%' }}>By 4Makers</h1>
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>ID</b></p>  <div style={{marginBottom: '1px', float: 'right',}}><p style={{  cursor: 'pointer', color: 'black', display:'inline' }} onClick={onClickIdCheck}>Check</p><Checkbox style={{marginLeft:'5px'}} checked={IdCheck} defaultChecked={false} disabled /></div>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={ohChangeId} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>NickName</b></p>   <div style={{marginBottom: '1px', float: 'right',}}><p style={{ cursor: 'pointer', color: 'black',  display:'inline'  }} onClick={onClickNickNameCheck}>Check</p><Checkbox style={{marginLeft:'5px'}} checked={NickNameCheck} defaultChecked={false} disabled /></div>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={ohChangeNickName} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px' }}><b>Password</b></p>
                    <Input.Password style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={onChagePassword}></Input.Password>
                    <br /> <br />
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>Password Check</b></p>{PasswordCheck !== Password ?
                        <p style={{float:'right', color:'red'}}>*비밀번호를 확인해주세요!</p>
                        :
                        <></>}
                    <Input.Password style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={onChagePasswordCheck}></Input.Password>
                    <br /> <br /> <br /> <br />
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '20px', display: 'inline', cursor: 'pointer' }} onClick={onClickConfirm}>Confirm</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href='/'><a><p style={{ fontSize: '20px', display: 'inline', color: 'black' }}>Index</p></a></Link>
                    </div>
                </Col>
                <Col sm={8} xs={6}></Col>
            </Row>
        </div>
    )
}

export default signup;