import styled from "styled-components";
import { darken, lighten } from "polished";

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #22202C, #402845);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 415px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: ${lighten(0.1, "#f64c75")};
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f64c75;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, "#f64c75")};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
