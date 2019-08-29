import React, {useEffect, useState, useMemo} from 'react';
import produce from 'immer';
import {Alert, Button, Text} from 'react-native';
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

            console.tron.warn('La vamos nos');

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
            }));

            setMeetups(
                produce(meetups, draft => {
                    draft.push(...newData);
                }),
            );
            // console.tron.warn(response.data.length === 0)
            // console.tron.warn([...meetups, ...response.data])

            // if(response.data.length === 0){
            //     setEndPage(true)
            // } else {

            //     const updatedMeetup = [...meetups, ...response.data.reduce( (filtered, item) => {

            //         if(meetups.find(e => e.id === item.id) === undefined) {
            //             filtered.push({
            //                 ...item,
            //                 formattedDate: format(new Date(item.date), "dd 'de' MMMM, 'às' HH'h'", { locale: pt}),
            //                 pastMeetup: (new Date()) > new Date(item.date)
            //             })

            //        }
            //         return filtered
            //     }, [] )  ]

            //     if(meetups !== updatedMeetup) {
            //         setMeetups(updatedMeetup)
            //     }

            // }
        }
        // if (isFocused) {
        loadMeetups();
        // }
    }, [date, page]);


    async function loadMore() {
        console.tron.warn('Loading more ou nao');
        console.tron.warn(endPage);
        if (endPage == false) {
            setPage(page + 1);
            // loadMeetups()
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
                console.tron.warn(response.data);
                Alert.alert('Voce se juntou ao meetup!', 'Parabens');
            })
            .catch(error => {
                console.tron.error(error.response.data.error);
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
                <Button onPress={loadMore} title="Debug2" />

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
