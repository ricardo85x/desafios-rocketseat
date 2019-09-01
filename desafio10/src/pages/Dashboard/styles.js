import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
    /* deixa o conteudo em baixo do topete do iphone(SafeAreaView)*/
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
    contentContainerStyle: {padding: 30},
    showsVerticalScrollIndicator: false,
})``;

export const DateContainer = styled.View`
    align-self: center;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`;

export const PrevDateButton = styled(RectButton)``;

export const NextDateButton = styled(RectButton)``;

export const DateText = styled.Text`

    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: 0 10px;

`;
