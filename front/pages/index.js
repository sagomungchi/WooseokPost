import react, { useState, useCallback, useEffect } from 'react';

import Login from '../components/Login';
import Post from '../components/Post';

const Index = () => {
    const [loginCheck, setLoginCheck] = useState(false); //로그인 체크

    return (
        <div>
            {loginCheck ?  //로그인 시
                <Post setLogin = {setLoginCheck} />
                :
                <Login setLogin = {setLoginCheck} /> //로그인이 안되있을 시 
            }
        </div>
    )
}

export default Index;