import React, {useEffect, useState, useMemo} from 'react';
import {Alert} from 'react-native';
import {format, addDays, subDays} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {withNavigationFocus} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';

import Subscription from '~/components/Subscription';

import {
    Container,
    Title,
    List,
    DateContainer,
    PrevDateButton,
    NextDateButton,
    DateText,
} from './styles';
// import console = require('console');

// import { Container } from './styles';


function Subscriptions({isFocused}) {
    const [appointments, setSubscriptions] = useState([]);
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [endPage, setEndPage] = useState(false)


    async function loadSubscriptions() {
        const response = await api.get('/meetups-user');

        setSubscriptions([...appointments, ...response.data.reduce( (filtered, item) => {

            if(appointments.find(e => e.id === item.id) === undefined) {
                filtered.push({
                    ...item,
                    formattedDate: format(new Date(item.date), "dd 'de' MMMM, 'às' HH'h'", { locale: pt}),
                    pastMeetup: (new Date()) > new Date(item.date)
                })
               
           }
            return filtered
        }, [] )  ])

    }

    useEffect(() => {
        loadSubscriptions();
    }, [date, isFocused]);

    
    async function loadMore(){

        if(endPage == false){
            setPage(page + 1)
            loadSubscriptions()
        }
        
        
    }

    
    async function handleUnSubscribe({item: {id: meetup_id, Subscriptions:sub }}) {

        api.delete(`/subscriptions/${sub[0].id}`, {
            meetup_id
        }).then(response => {
            setSubscriptions(appointments.filter(e => e.id != meetup_id))

        }).catch((error) => {
            Alert.alert('Erro', error.response.data.error);
        });

    }

    return (
        <Background>
            <Container>
                
                <List
                    data={appointments}
                    onScroll={() => {

                    }}
                    keyExtractor={item => String(item.id)}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    renderItem={item => (
                        <Subscription
                            onUnSubscribe={() => handleUnSubscribe(item)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}

Subscriptions.navigationOptions = {
    tabBarLabel: 'Inscrições',
    tabBarIcon: ({tintColor}) => (
        <Icon name="local-offer" size={20} color={tintColor} />
    ),
};

export default withNavigationFocus(Subscriptions);
