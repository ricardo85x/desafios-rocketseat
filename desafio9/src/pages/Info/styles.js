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


export const BoxImage = styled.div`

    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: #18161f;
    border: 1px solid #18161f;

    img {
        max-height: 300px;
    }
`

export const Description = styled.p`

    margin-top: 20px;
    color: #fff;
    white-space: pre-line;
`

export const DateLocationContainer = styled.div`

    display: flex;
    margin-top: 20px;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
        margin-right: 30px;

        svg {
            margin-right: 5px;
          
        }
        span {
            color: #CBCBCB99;
            font-size: 12px;
        }
    }
    
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

        > div {
            
        }a {
            margin-left: auto;
            color: #fff;
            border: none;
            padding: 7px;
            background: #3b9eff;
            border-radius: 4px;

            display: flex;

            align-items: center;

            span {
                align-self: center;
                margin:0;
            }
            svg {
                align-self: center;
                margin:0;
            }

            

            &:hover {
                background: ${darken(0.05, '#3b9eff')}
            }
        }

        button {
           
            margin-left: 10px;
            color: #fff;
            border: none;
            padding: 7px;
            background: #d33f58;
            border-radius: 4px;

            span {
                align-self: center;
                margin:0;
            }
            svg {
                align-self: center;
                margin:0;
            }

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
