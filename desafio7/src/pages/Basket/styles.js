import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
    background-color: black;
    flex: 1;
    padding: 0px 10px;
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

export const BasketList = styled(FlatList)`
    max-height: 400px;
`;

export const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const ImagemProduct = styled.Image`
    width: 80px;
    height: 80px;
`;

export const DescContainer = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

export const ProductDescription = styled.Text``;

export const PriceDesc = styled.Text`
    font-weight: bold;
    padding-left: 3px;
`;

export const DeleteProductButton = styled(RectButton)`
    margin-left: auto;
    margin-right: 5px;
`;

export const Trash = styled(Button)``;

export const QtdContainer = styled.View`
    display: flex;
    flex-direction: row;
    background-color: lightgrey;
    align-items: center;
    /* padding: 2px 10px; */
    border-radius: 5px;
    padding: 7px 1px;
`;

export const RemoveIcon = styled(Button)``;

export const QtdInput = styled.TextInput`
    margin-left: 2px;
`;

export const AddIcon = styled(Button)`
    margin-left: 2px;
`;

export const PriceQtd = styled.Text`
    margin-left: auto;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
`;

export const TotalText = styled.Text`
    align-self: center;
    margin-top: 20px;
    font-size: 19px;
    font-weight: bold;
    color: grey;
`;

export const PriceTotal = styled.Text`
    align-self: center;
    margin-top: 1px;
    font-size: 28px;
    font-weight: bold;
`;

export const BotaoFinalizar = styled(RectButton)`
    background-color: red;
    border-radius: 3px;
    padding: 6px 1px;
    margin-top: 20px;
`;

export const BotaoText = styled.Text`
    align-self: center;
    color: #ffff;
    font-size: 15px;
    font-weight: bold;
`;
