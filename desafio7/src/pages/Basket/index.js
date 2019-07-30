import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/modules/basket/actions';

import { formatPrice } from '../../util/format';

import {
    Container,
    BasketList,
    TopContainer,
    ImagemProduct,
    DescContainer,
    ProductDescription,
    PriceDesc,
    DeleteProductButton,
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
    FooterContainer,
    MainContainer,
} from './styles';

export default function Basket() {
    const dispatch = useDispatch();

    const handleDeleteProduct = id => {
        dispatch(CartActions.removeFromBasket(id));
    };

    const basket = useSelector(state =>
        state.basket.map(product => ({
            ...product,
            subtotal: formatPrice(product.amount * product.price),
        }))
    );

    const total = useSelector(state =>
        formatPrice(
            state.basket.reduce((totalPrice, product) => {
                return totalPrice + product.amount * product.price;
            }, 0)
        )
    );

    const handleUpdate = (action, product) => {
        if (action === 'ADD') {
            dispatch(CartActions.updateAmount(product.id, product.amount + 1));
        } else {
            dispatch(CartActions.updateAmount(product.id, product.amount - 1));
        }
    };

    return (
        <Container>
            <MainContainer>
                <BodyContainer>
                    <BasketList
                        showsVerticalScrollIndicator
                        data={basket}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <>
                                <TopContainer>
                                    <ImagemProduct
                                        source={{
                                            uri: `${item.image}`,
                                        }}
                                    />
                                    <DescContainer>
                                        <ProductDescription>
                                            {item.title}
                                        </ProductDescription>
                                        <PriceDesc>
                                            {item.formatedPrice}
                                        </PriceDesc>
                                    </DescContainer>
                                    <DeleteProductButton
                                        onPress={() =>
                                            handleDeleteProduct(item.id)
                                        }
                                    >
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
                                    </DeleteProductButton>
                                </TopContainer>
                                <QtdContainer>
                                    <RemoveIcon
                                        onPress={() =>
                                            handleUpdate('REMOVE', item)
                                        }
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
                                    >
                                        {item.amount}
                                    </QtdInput>
                                    <AddIcon
                                        onPress={() =>
                                            handleUpdate('ADD', item)
                                        }
                                        type="clear"
                                        icon={
                                            <Icon2
                                                name="add-circle-outline"
                                                size={25}
                                                color="red"
                                            />
                                        }
                                    />
                                    <PriceQtd>{item.subtotal}</PriceQtd>
                                </QtdContainer>
                            </>
                        )}
                    />
                </BodyContainer>

                <FooterContainer>
                    <TotalText>TOTAL</TotalText>
                    <PriceTotal>{total}</PriceTotal>
                    <BotaoFinalizar>
                        <BotaoText>FINALIZAR PEDIDO</BotaoText>
                    </BotaoFinalizar>
                </FooterContainer>
            </MainContainer>
        </Container>
    );
}
