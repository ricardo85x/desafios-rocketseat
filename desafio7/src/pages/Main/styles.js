import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

export const Container = styled.View`
    background-color: black;
    align-content: center;
    align-items: center;
`;

export const ProductFlatList = styled(FlatList)`
    background-color: black;
`;

export const ProductContainer = styled.View`
    background-color: #fff;
    max-width: 300px;
`;

export const ProductImage = styled.Image`
    min-width: 270px;
    min-height: 270px;
    align-self: center;
`;

export const ProductDescription = styled.Text`
    margin-left: 20px;
`;

export const ProductPrice = styled.Text`
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const ButtonArea = styled(RectButton)`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: auto;

    background-color: red;
    border-radius: 5px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;

export const ProductQuantity = styled.Text`
    margin-left: 7px;
    color: white;
`;

export const ButtonText = styled.Text`
    margin-left: auto;
    color: white;
    font-weight: bold;
`;
