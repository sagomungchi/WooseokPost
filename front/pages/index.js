import react, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Login from '../components/Login';
import Post from '../components/Post';

const Index = () => {
    const [loginCheck, setLoginCheck] = useState(false); //로그인 체크
    const [me, setMe] = useState(null);

    const loadUser = () => {
        try {

            axios.get('http://localhost:3065/api/user', { withCredentials: true })
            .then(res=>{
                setLoginCheck(true);
                setMe({
                    nickname: res.data.nickname,
                    userId : res.data.userId
                })
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { //내 정보가 없는 경우
        if (!me) {
            loadUser();
        }
    }, [])

    return (
        <div>
            {loginCheck ?  //로그인 시
                <Post me={me} setLogin = {setLoginCheck} />
                :
                <Login setLogin = {setLoginCheck} setMe={setMe} /> //로그인이 안되있을 시 
            }
        </div>
    )
}

export default Index;