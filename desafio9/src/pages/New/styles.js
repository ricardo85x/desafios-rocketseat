import styled from 'styled-components'
import PerfectScrollBar from "react-perfect-scrollbar";

import "react-toastify/dist/ReactToastify.css";
import { darken } from 'polished';
import { Form } from '@rocketseat/unform'



export const Container = styled.div`
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;

    * {
        margin-bottom: 10px;
    }
`;

export const ImageContainer = styled.div`

    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${darken(0.05, '#d33f58')};
    padding: 60px 0;
    border-radius: 4px;

    svg {
        color: #fff;
        size: 20px;
    }
    strong { 
        display: block;
    }

`


export const Scroll = styled(PerfectScrollBar)`
    max-height: 400px;
    padding: 5px 0px 5px 0;
`

export const FormContainer = styled(Form)`

    display: flex;

    flex-direction: column;

    



   
    

    

`;
