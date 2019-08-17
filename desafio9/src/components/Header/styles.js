import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: #18161f;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a img {
    width: 23px;
    
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;


  div {
    text-align: right;
    margin-right: 20px;
  

    strong {
      display: block;
      color: #fff;
    }

    a {
      font-size: 12px;
      color: #999;
    }
  }

  button {
    background-color: #d33f58;
    border: none;
    padding: 2px 15px;
    color: #fff;
    border-radius: 4px;


    &:hover {
      background-color: ${darken(0.04, '#d33f58')};

    }

  }
`;
