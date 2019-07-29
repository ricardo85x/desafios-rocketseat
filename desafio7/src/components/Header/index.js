import React from 'react';

import IconBadge from 'react-native-icon-badge';
import { Text } from 'react-native';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import {
    ContainerBackButton,
    HearderTitle,
    Logo,
    BasketContainerButton,
    BasketIcon,
} from './styles';

function Header(props) {
    const { navigation } = props;

    const basketSize = useSelector(state => state.basket.length);

    return (
        <ContainerBackButton onPress={() => navigation.navigate('Main')}>
            <HearderTitle>ROCKETSHOES</HearderTitle>
            <Logo name="shoe-formal" size={30} color="#ffff" />

            <BasketContainerButton
                onPress={() => navigation.navigate('Basket')}
            >
                <IconBadge
                    MainElement={
                        <BasketIcon name="basket" size={35} color="#ffff" />
                    }
                    BadgeElement={
                        <Text style={{ color: '#ffff', fontSize: 10 }}>
                            {basketSize}
                        </Text>
                    }
                    IconBadgeStyle={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                    }}
                />
            </BasketContainerButton>
        </ContainerBackButton>
    );
}

Header.propTypes = {
    navigation: PropTypes.func.isRequired,
};

export default Header;
