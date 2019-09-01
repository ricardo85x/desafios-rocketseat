import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
    margin-bottom: 15px;
    /* padding: 20px; */
    border-radius: 4px;
    background: #fff;

    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: space-between; */

    opacity: ${props => (props.past ? 0.7 : 1)};
`;

export const Left = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const BannerContainer = styled.View`
    flex: 1;
    background: transparent;
    height: 200px;
    width: 100%;

    /* border-radius: 10px; */

`

export const Banner = styled.Image`
 
    width: 100%;
    height: 250px;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;


    
`;
export const Info = styled.View`
    margin-left: 15px;
`;
export const Name = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #333;
`;
export const Time = styled.Text`
    color: #999;
    font-size: 13px;
    margin-top: 4px;
`;

export const DetailContainer = styled.View`

    padding-left: 15px;
    padding-right: 15px;

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;
   

`
export const Title = styled.Text`
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
`

export const ItemDatailContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
  
`

export const ItemText = styled.Text`
    margin-left: 10px;
    color: #999;
`

export const ButtonSubscribe = styled(TouchableOpacity)`

    display: flex;
    width: 100% ;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-radius: 4px;
    padding: 10px;

`;


export const SubscribeText = styled.Text`
    
    font-size: 17px;
    color: #FFF;

`
