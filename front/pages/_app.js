import react from 'react';
import Head from 'next/head';
import { Row, Col } from 'antd';



import 'antd/dist/antd.css';

const Jrun2ng = ({ Component }) => {

    return (
        <div style={{ fontFamily: 'Dancing Script, cursive' }}>
            <Head>
                <title>Jru2ng</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet"></link>


            <Component />



        </div>
    )

}

export default Jrun2ng;