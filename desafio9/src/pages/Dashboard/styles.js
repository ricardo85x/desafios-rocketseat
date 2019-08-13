import styled from 'styled-components'
import PerfectScrollBar from "react-perfect-scrollbar";

import "react-toastify/dist/ReactToastify.css";
import { darken } from 'polished';


export const Container = styled.div`
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`;


export const Scroll = styled(PerfectScrollBar)`
    max-height: 400px;
    padding: 5px 0px 5px 0;
`

export const Content = styled.div`

    display: flex;

    flex-direction: column;

    > div {
        display: flex;
        align-items: center;
        
        h1 {
        color: #fff;
        margin-bottom: 20px;
        }

        a {
            margin-left: auto;
            color: #fff;
            border: none;
            padding: 7px;
            background: #d33f58;
            border-radius: 4px;

            

            &:hover {
                background: ${darken(0.05, '#d33f58')}
            }
        }
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

            &:hover {
                background: ${darken(0.05, '#291f30')}
            }

            cursor: pointer;


            display: flex;

            

            time {
                margin-left: auto;
                margin-right: 5px;
                color: #666;
            }

            a {
                color: #666;
            }


        }
    }


   
    

    

`;
