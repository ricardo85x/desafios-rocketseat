import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as CartActions from '../../store/modules/basket/actions';

import api from '../../services/api';

import { formatPrice } from '../../util/format';

import {
    Container,
    ProductFlatList,
    ProductContainer,
    ProductImage,
    ProductDescription,
    ProductPrice,
    ButtonArea,
    ProductQuantity,
    ButtonText,
} from './styles';

function Main(props) {
    const [products, setProducts] = useState([]);

    const amount = useSelector(state => id => {
        const product = state.basket.findIndex(p => p.id === id);
        if (product >= 0) {
            return state.basket[product].amount;
        }
        return 0;
    });

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products');

            if (response.data) {
                setProducts(
                    response.data.map(item => ({
                        ...item,
                        formatedPrice: formatPrice(item.price),
                    }))
                );
            }
        }
        loadProducts();
    }, []);

    const dispatch = useDispatch();

    const handleAddBasket = item => {
        const { navigation } = props;

        dispatch(CartActions.addToBasket(item));

        navigation.navigate('Basket', { item });
    };

    return (
        <Container>
            <ProductFlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={products}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <ProductContainer>
                        <ProductImage source={{ uri: item.image }} />
                        <ProductDescription>{item.title}</ProductDescription>
                        <ProductPrice>{item.formatedPrice}</ProductPrice>
                        <ButtonArea onPress={() => handleAddBasket(item)}>
                            <Icon name="cart-plus" size={20} color="#FFF" />
                            <ProductQuantity>{amount(item.id)}</ProductQuantity>
                            <ButtonText>ADICIONAR</ButtonText>
                        </ButtonArea>
                    </ProductContainer>
                )}
            />
        </Container>
    );
}

Main.navigationOptions = {
    title: 'Main',
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

export default Main;
