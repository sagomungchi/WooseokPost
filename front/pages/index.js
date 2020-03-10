import react, { useState, useCallback, useEffect } from 'react';

import Login from '../components/Login';
import Post from '../components/Post';

const Index = () => {
    const [loginCheck, setLoginCheck] = useState(true); //로그인 체크

    return (
        <div>
            {loginCheck ?  //로그인 시
                <Post />
                :
                <Login /> //로그인이 안되있을 시 
            }
        </div>
    )
}

export default Index;