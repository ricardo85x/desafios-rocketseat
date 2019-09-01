import styled,{css} from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  background: #18161f;;
  display: flex;
  flex-direction: row;
  height: 60px;

  align-items: center;

   ${Platform.select({ 
      ios: css`
        justify-content: flex-end`, 
      android: css`
        justify-content: center` 
   })};


  /* justify-content: flex-end ; */

`;


export const Logo = styled.Image`

    /*
    ${Platform.select({ 
      ios: css`
        margin-right: 35px;`, 
      android: css`
        margin-right: inherit;` 
    })};
    */

    ${Platform.os === 'ios' && css`margin-right: 35px`}
    height: 25px;
    width: 25px;

`

