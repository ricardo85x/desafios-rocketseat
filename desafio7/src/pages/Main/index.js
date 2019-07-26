import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import IconBadge from 'react-native-icon-badge';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';

import api from '../../services/api';
import {
    Container,
    HearderTitle,
    HeaderArea,
    Logo,
    BasketContainerButton,
    BasketIcon,
    ProductFlatList,
    ProductContainer,
    ProductImage,
    ProductDescription,
    ProductPrice,
    ButtonArea,
    ProductQuantity,
    ButtonText,
} from './styles';

export default function Main(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products');

            if (response.data) {
                setProducts(response.data);
            }
        }
        loadProducts();
    }, []);

    const handleAddBasket = item => {
        const { navigation } = props;

        navigation.navigate('Basket', { item });
    };

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
            <ProductFlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={products}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <ProductContainer>
                        <ProductImage source={{ uri: item.image }} />
                        <ProductDescription>{item.title}</ProductDescription>
                        <ProductPrice>{item.price}</ProductPrice>
                        <ButtonArea onPress={() => handleAddBasket(item)}>
                            <Icon name="cart-plus" size={20} color="#FFF" />
                            <ProductQuantity>10</ProductQuantity>
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
