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
    const [dates, setDates] = useState([])
    const [dateIndex, setDateIndex] = useState(-1)
    const [endPage, setEndPage] = useState(false)

    // useEffect(() => {
    //     async function loadDates(){
    //         const respose = await api.get('/meetups-dates')
    //         setDates(respose.data)
    //         if(respose.data.length > 0 ){
    //             console.tron.warn(new Date(respose.data[0]).toISOString())
    //             setDate(new Date(respose.data[0]))
    //             setDateIndex(0)
    //         } else {
    //             setDate(new Date())
    //             setDateIndex(-1)
    //         }
    //     }
    //     loadDates()
    // }, [])

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMM", {locale: pt}),
        [date],
    );

    const dateFormattedDay = useMemo(() => format(date, "yyyy-MM-dd"), [
        date,
    ]);

    async function loadSubscriptions() {
        const response = await api.get('/meetups-user');


        console.tron.warn({appointments})
        console.tron.warn({response: response.data})


        if(response.data.length === 0){
           // setEndPage(true)
        }

        setSubscriptions([...appointments, ...response.data.reduce( (filtered, item) => {

            // console.tron.warn(item.id)

         


            if(appointments.find(e => e.id === item.id) === undefined) {
                filtered.push({
                    ...item,
                    formattedDate: format(new Date(item.date), "dd 'de' MMMM, 'às' HH'h'", { locale: pt}),
                    pastMeetup: (new Date()) > new Date(item.date)
                })
               

           }
            return filtered
        }, [] )  ])

        


       
        // setSubscriptions([...appointments, ...response.data.map(item => ({
        //     ...item,
        //     formattedDate: format(new Date(item.date), "dd 'de' MMMM, 'às' HH'h'", { locale: pt}),
        //     pastMeetup: (new Date()) > new Date(item.date)
        // })) ]);
    }

    useEffect(() => {
        // if (isFocused) {
        loadSubscriptions();
        // }
    }, [date, isFocused]);

    
    async function loadMore(){

        if(endPage == false){
            setPage(page + 1)
            loadSubscriptions()
        }
        
        
    }

    function handleDate(type) {


        setSubscriptions([])
        setEndPage(false)
        setPage(1)
        
        if (type === 'prev') {
            // if(dateIndex !== -1){
            //     if(dateIndex > 0){
            //         setDate(new Date(dates[dateIndex - 1]))
            //         setDateIndex(dateIndex - 1)
            //     }
            // }
            const newDate = subDays(date, 1);
            setDate(newDate);
        } else {
            // if(dateIndex !== -1){
            //     if(dateIndex > 0 && dateIndex < dates.length + 1){
            //         setDate(new Date(dates[dateIndex + 1]))
            //         setDateIndex(dateIndex + 1)
            //     }
            // }
            const newDate = addDays(date, 1);
            setDate(newDate);
        }
    }

    async function handleUnSubscribe({item: {id: meetup_id, Subscriptions:sub }}) {

     
        api.delete(`/subscriptions/${sub[0].id}`, {
            meetup_id
        }).then(response => {
            console.tron.warn(response.data)
            setSubscriptions(appointments.filter(e => e.id != meetup_id))

        }).catch((error) => {
            console.tron.error(error.response.data.error)
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

// tabBarIcon.propTypes = {
//     tintColor: PropTypes.string.isRequired,
// };

export default withNavigationFocus(Subscriptions);
