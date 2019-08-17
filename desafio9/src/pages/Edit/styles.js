import styled from 'styled-components'
import PerfectScrollBar from "react-perfect-scrollbar";

import "react-toastify/dist/ReactToastify.css";
import { darken, lighten } from 'polished';



export const Container = styled.div`
    max-width: 900px;
    margin: 30px auto;
    display: flex;
    flex-direction: column;

    * {
        margin-bottom: 10px;
    }




    form {
        display: flex;

        flex-direction: column;


        input[type='file'] {
            display: none;
        }

        input, textarea {
            background: #2a1e2e;
            border: none;

            padding: 12px;
            color: #9E9E9E;
        }

        > div {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            
            div {
                
                display: flex;
                align-items: center;
                justify-content: center;
                align-content: center;
                justify-items: center;

                margin-top: 10px;

                background: #d33f58;
                padding: 10px 10px 0px 10px;
                border-radius: 4px;

                svg {
                    color: #fff;
                }

                button {
                border: none;
                margin-left: 10px;
                color: #fff;
                background: none;

                }

            }

            

        }
    }
`;


export const ImageContainer = styled.div`

    display: flex;
    align-items: center;

    justify-content: center;
    flex-direction: column;
    background: linear-gradient(-90deg, #22202C, #1a151f);

    > img {
        max-height: 260px;
        max-width: 900px;
        margin-bottom: 0px;
    }

    min-height: 260px;
    border-radius: 4px;
    color: #666;
    border: 1px solid #666;

    cursor: pointer;

    &:hover {
        opacity: 0.70;
    }

    svg {
        color: #666;
        size: 20px;
    }

    strong { 
        display: block;
    }
`