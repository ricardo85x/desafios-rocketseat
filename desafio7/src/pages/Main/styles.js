import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
    background-color: black;
    flex: 1;
`;

export const HeaderArea = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    align-items: center;
`;

export const HearderTitle = styled.Text`
    color: #ffff;
    font-size: 18px;
    font-weight: bold;
`;

export const Logo = styled(Icon)`
    margin-left: 10px;
`;

export const BasketContainerButton = styled(RectButton)`
    margin-left: auto;
    margin-right: 2px;
`;

export const BasketIcon = styled(Icon)``;

export const BodyContainer = styled.View`
    background-color: #ffff;
    padding: 5px;
    border-radius: 5px;
`;

// export const Container = styled.View`
//     background-color: black;
//     align-content: center;
//     align-items: center;
// `;

export const ProductFlatList = styled(FlatList)``;

export const ProductContainer = styled.View`
    background-color: #fff;
    max-width: 300px;
    max-height: 400px;

    margin-left: 10px;
    margin-right: 10px;
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
    margin: auto 10px 10px 10px;

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
