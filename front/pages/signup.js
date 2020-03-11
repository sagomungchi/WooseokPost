import react, { useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Col, Row, Checkbox, message } from 'antd';
import axios from 'axios';

const signup = () => {

    const [userId, setUserId] = useState('');
    const [nickname, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [userIdCheck, setuserIdCheck] = useState(false);
    const [nicknameCheck, setNickNameCheck] = useState(false);

    const ohChangeuserId = useCallback((e) => {
        setUserId(e.target.value)
        setuserIdCheck(false)
    }, [userId, userIdCheck]);

    const ohChangeNickName = useCallback((e) => {
        setNickName(e.target.value)
        setNickNameCheck(false)
    }, [nickname, nicknameCheck]);

    const onChagePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [password]);

    const onChagePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
    }, [passwordCheck]);

    const onClickuserIdCheck = () => { //아이디 중복 확인

        try {
            if (userId !== '') {
                axios
                    .post(`http://localhost:3065/api/user/idCheck`, {
                        userId: userId
                    }).then(res => {
                
                        if (res.data.existence === false) { //아이디가 중복되지 않았다면 체크
                            setuserIdCheck(true);
                        } else {
                            //중복 메세지 출력
                            message.error('이미 사용중인 아이디입니다!')
                        }
                    })
            }
        } catch (error) {
            console.error(error)
        }

    }
    const onClickNickNameCheck = () => { //닉네임 중복 확인
        try {
            if (nickname !== '') {
                axios
                    .post(`http://localhost:3065/api/user/nicknameCheck`, {
                        nickname: nickname
                    }).then(res => {
                        if (res.data.existence === false) { //아이디가 중복되지 않았다면 체크
                            setNickNameCheck(true);
                        } else {
                            //중복 메세지 출력
                            message.error('이미 사용중인 닉네임입니다!')
                        }
                    })
            }

        } catch (error) {
            console.error(error)
        }
    }
    const onClickConfirm = () => { //회원가입 완료
        //아이디 중복체크 확인 && 닉네임 중복체크 확인 && 비밀번호 확인
        if ((password === passwordCheck) && userIdCheck && nicknameCheck) {
            //회원가입 요청
            try {
                axios
                .post(`http://localhost:3065/api/user`,{
                    userId : userId,
                    nickname : nickname,
                    password : password
                })
                .then(res=>{
               
                    if(res.data.success){
                      
                        Router.push('/');
                        message.success('회원가입 완료!')
                    }
                    
                })
                
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div style={{ marginTop: '10%', fontFamily: 'Dancing Script, cursive' }}>
            <Row>
                <Col sm={8} xs={6}></Col>
                <Col sm={8} xs={12}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10%' }}>By 4Makers</h1>
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>Id</b></p>  <div style={{ marginBottom: '1px', float: 'right', }}><p style={{ cursor: 'pointer', color: 'black', display: 'inline' }} onClick={onClickuserIdCheck}>Check</p><Checkbox style={{ marginLeft: '5px' }} checked={userIdCheck} defaultChecked={false} disabled /></div>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onPressEnter={onClickuserIdCheck} onChange={ohChangeuserId} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>Nickname</b></p>   <div style={{ marginBottom: '1px', float: 'right', }}><p style={{ cursor: 'pointer', color: 'black', display: 'inline' }} onClick={onClickNickNameCheck}>Check</p><Checkbox style={{ marginLeft: '5px' }} checked={nicknameCheck} defaultChecked={false} disabled /></div>
                    <Input style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onPressEnter={onClickNickNameCheck} onChange={ohChangeNickName} ></Input>
                    <br /> <br />
                    <p style={{ marginBottom: '1px' }}><b>Password</b></p>
                    <Input.Password style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onChange={onChagePassword}></Input.Password>
                    <br /> <br />
                    <p style={{ marginBottom: '1px', display: 'inline' }}><b>Password Check</b></p>{passwordCheck !== password ?
                        <p style={{ float: 'right', color: 'red' }}>*비밀번호를 확인해주세요!</p>
                        :
                        <></>}
                    <Input.Password style={{ borderWidth: '0px 0px 2px 0px', fontFamily: 'Roboto, sans-serif' }} onPressEnter={onClickConfirm} onChange={onChagePasswordCheck}></Input.Password>
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