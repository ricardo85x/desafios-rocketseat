import styled from 'styled-components'

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


