import react, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

import Login from '../components/Login';
import Post from '../components/Post';

const Index = () => {
    const [loginCheck, setLoginCheck] = useState(false); //로그인 체크
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = () => {
        try {
            axios.get('http://localhost:3065/api/user', { withCredentials: true })
                .then(res => {
                    setLoginCheck(true);
                    setMe({
                        nickname: res.data.nickname,
                        userId: res.data.userId
                    })
                    setLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }

    const componentsLoader = () => {
        return (
            loginCheck ?  //로그인 시
                <Post  me={me} setLogin={setLoginCheck} />
                :
                <Login setLogin={setLoginCheck} setMe={setMe} /> //로그인이 안되있을 시 
        )
    }


    useEffect(() => { //내 정보가 없는 경우
        if (!me) {
            loadUser();
            setLoading(false);
        }
    }, [])

    return (
        <div>
            {loading ?  //새로고침시 로그인창 보였다가 출력되는것을 로딩창으로 가려주기 위함
                <Spin style={{textAlign:'center', background:'rgba(0, 0, 0, 0.05', borderRadius: '4px', marginBottom:'20px', padding:'30px 50px', margin: "20px 0"}} />
                :
                componentsLoader()
            }
        </div>
    )
}

export default Index;