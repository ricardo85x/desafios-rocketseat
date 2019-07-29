import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton } from 'react-native-gesture-handler';

export const ContainerBackButton = styled(RectButton)`
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
    align-items: center;
    background-color: black;
    padding: 0 10px;
    height: 100px;
`;

export const HearderTitle = styled.Text`
    color: #ffff;
    font-size: 18px;
    font-weight: bold;
`;

export const Logo = styled(Icon)`
    margin-left: 10px;
    margin-right: 20px;
`;

export const BasketContainerButton = styled(RectButton)`
    margin-left: auto;
    margin-right: 2px;
`;

export const BasketIcon = styled(Icon)``;
