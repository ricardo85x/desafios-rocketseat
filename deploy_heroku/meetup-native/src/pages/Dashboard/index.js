import React, {useEffect, useState, useMemo} from 'react';
import produce from 'immer';
import {Alert, Button, Text, Platform} from 'react-native';

import {format, addDays, subDays} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {withNavigationFocus} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import Meetup from '~/components/Meetup';

import {
    Container,
    List,
    DateContainer,
    PrevDateButton,
    NextDateButton,
    DateText,
} from './styles';

function Dashboard({isFocused}) {
    const [meetups, setMeetups] = useState([]);
    const [date, setDate] = useState(new Date('2019-08-30'));
    const [page, setPage] = useState(1);
    const [dates, setDates] = useState([]);
    const [dateIndex, setDateIndex] = useState(-1);
    const [endPage, setEndPage] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMM", {locale: pt}),
        [date],
    );

    const dateFormattedDay = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);

    function gravaMeetUp(dados) {}

        useEffect(() => {
        async function loadMeetups() {
            const response = await api.get('/meetups-filter', {
                params: {
                    date: format(date, 'yyyy-MM-dd'),
                    page,
                },
            });


            if (response.data.length === 0) {
                setEndPage(true);
            }


            const newData = response.data.map(item => ({
                ...item,
                formattedDate: format(
                    new Date(item.date),
                    "dd 'de' MMMM, 'às' HH'h'",
                    {locale: pt},
                ),
                pastMeetup: new Date() > new Date(item.date),
                banner: { ...item.banner, url: Platform.OS === 'ios' ? item.banner.url : item.banner.url.replace('localhost', '10.0.2.2')  }

            }));



            

            setMeetups(
                produce(meetups, draft => {
                    draft.push(...newData);
                }),
            );


        }
        
        loadMeetups();
        
    }, [date, page]);


    async function loadMore() {
     
        if (endPage == false) {
            setPage(page + 1);
        }
    }

    function handleDate(type) {
        setMeetups([]);
        setEndPage(false);
        setPage(1);

        if (type === 'prev') {
            const newDate = subDays(date, 1);
            setDate(newDate);
        } else {
            const newDate = addDays(date, 1);
            setDate(newDate);
        }
    }

    async function handleSubscribe({item: {id: meetup_id}}) {
        api.post(`/subscriptions`, {
            meetup_id,
        })
            .then(response => {
                Alert.alert('Voce se juntou ao meetup!', 'Parabens');
            })
            .catch(error => {
                Alert.alert('Erro', error.response.data.error);
            });
    }

    return (
        <Background>
            <Container>
                <DateContainer>
                    <PrevDateButton onPress={() => handleDate('prev')}>
                        <Icon name="chevron-left" size={20} color="#fff" />
                    </PrevDateButton>

                    <DateText>{dateFormatted}</DateText>
                    <NextDateButton onPress={() => handleDate('next')}>
                        <Icon name="chevron-right" size={20} color="#fff" />
                    </NextDateButton>
                </DateContainer>


                {/* <Button onPress={loadMore} title="Debug2" /> */}

                <List
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.05}
                    renderItem={item => (
                        <Meetup
                            onSubscribe={() => handleSubscribe(item)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'MeetUps',
    tabBarIcon: ({tintColor}) => (
        <Icon name="list" size={20} color={tintColor} />
    ),
};

// tabBarIcon.propTypes = {
//     tintColor: PropTypes.string.isRequired,
// };

export default withNavigationFocus(Dashboard);
