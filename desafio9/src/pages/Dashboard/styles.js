import styled from 'styled-components'
import PerfectScrollBar from "react-perfect-scrollbar";

import "react-toastify/dist/ReactToastify.css";


export const Container = styled.div`
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`;


export const Scroll = styled(PerfectScrollBar)`
    max-height: 400px;
    padding: 5px 15px;
`

export const Content = styled.div`

    display: flex;

    flex-direction: column;

    > h1 {
        color: #fff;
        margin-bottom: 20px;
    }


    ul {
        li {
            padding: 15px;
            color: #fff;
            font-weight: bold;
            flex: 1;
            background: #291f30;
            margin-bottom: 10px;
            border-radius: 2px;
        }
    }


   
    

    

`;
