import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import IconBadge from 'react-native-icon-badge';
import { Text } from 'react-native';

import {
    Container,
    HeaderArea,
    HearderTitle,
    Logo,
    BasketContainerButton,
    BasketIcon,
    BasketList,
    TopContainer,
    ImagemProduct,
    DescContainer,
    ProductDescription,
    PriceDesc,
    DeleteProductContainer,
    Trash,
    QtdContainer,
    RemoveIcon,
    QtdInput,
    AddIcon,
    PriceQtd,
    TotalText,
    PriceTotal,
    BotaoFinalizar,
    BotaoText,
    BodyContainer,
} from './styles';

export default function Basket() {
    return (
        <Container>
            <HeaderArea>
                <HearderTitle>ROCKETSHOES</HearderTitle>
                <Logo name="shoe-formal" size={30} color="#ffff" />
                <BasketContainerButton>
                    <IconBadge
                        MainElement={
                            <BasketIcon name="basket" size={35} color="#ffff" />
                        }
                        BadgeElement={
                            <Text style={{ color: '#ffff', fontSize: 10 }}>
                                2
                            </Text>
                        }
                        IconBadgeStyle={{
                            width: 20,
                            height: 20,
                            backgroundColor: 'red',
                        }}
                    />
                </BasketContainerButton>
            </HeaderArea>
            <BodyContainer>
                <BasketList
                    showsVerticalScrollIndicator={false}
                    data={[
                        { id: 1, name: 'tenis' },
                        { id: 3, name: 'tenis 2' },
                    ]}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <>
                            <TopContainer>
                                <ImagemProduct
                                    source={{
                                        uri:
                                            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
                                    }}
                                />
                                <DescContainer>
                                    <ProductDescription>
                                        {item.name}
                                    </ProductDescription>
                                    <PriceDesc>10 reais</PriceDesc>
                                </DescContainer>
                                <DeleteProductContainer>
                                    <Trash
                                        type="clear"
                                        icon={
                                            <Icon
                                                name="trash-can"
                                                size={18}
                                                color="red"
                                            />
                                        }
                                    />
                                </DeleteProductContainer>
                            </TopContainer>
                            <QtdContainer>
                                <RemoveIcon
                                    type="clear"
                                    icon={
                                        <Icon
                                            name="minus-circle-outline"
                                            size={25}
                                            color="red"
                                        />
                                    }
                                />
                                <QtdInput
                                    style={{
                                        height: 35,
                                        width: 70,
                                        borderRadius: 3,
                                        backgroundColor: 'white',
                                    }}
                                />
                                <AddIcon
                                    type="clear"
                                    icon={
                                        <Icon2
                                            name="add-circle-outline"
                                            size={25}
                                            color="red"
                                        />
                                    }
                                />
                                <PriceQtd>RS 1000</PriceQtd>
                            </QtdContainer>
                        </>
                    )}
                />

                <TotalText>TOTAL</TotalText>
                <PriceTotal>999 reais</PriceTotal>
                <BotaoFinalizar>
                    <BotaoText>FINALIZAR PEDIDO</BotaoText>
                </BotaoFinalizar>
            </BodyContainer>
        </Container>
    );
}

/*


export const Botao = styled(RectButton)``;

export const BotaoText = styled.Text``;

export const ImagemProduct = styled.Image``;

export const ProductDescription = styled.Text``;

export const PriceDesc = styled.Text``;

export const Trash = styled(Icon)``;

export const QtdContainer = styled.View``;

export const RemoveIcon = styled(Icon)``;

export const AddIcon = styled(Icon)``;

export const QtdInput = styled.TextInput``;

export const PriceQtd = styled.Text``;

export const TotalText = styled.Text``;
export const PriceTotal = styled.Text``;

*/
