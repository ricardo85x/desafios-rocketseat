import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Banner, DetailContainer, Title,ButtonSubscribe, SubscribeText, ItemDatailContainer, ItemText} from './styles';

export default function Meetup({data: {item: data }, onSubscribe}) {
   
    return (
        <Container past={data.past}>

          
            <Banner source={{
                    uri: data.banner
                        ? data.banner.url
                        : `https://api.adorable.io/avatar/50/${data.title}.png`,
                }} />

    

            <DetailContainer>
                <Title>{data.title}</Title>
                <ItemDatailContainer>
                    <Icon name="event" />
                    <ItemText>{data.formattedDate}</ItemText>
                </ItemDatailContainer>

                <ItemDatailContainer>
                    <Icon name="location-on" size={15} color="#999" />
                    <ItemText>{data.location}</ItemText>
                </ItemDatailContainer>

                <ItemDatailContainer>
                    <Icon name="person" />
                    <ItemText>{data.organizer.name}</ItemText>
                </ItemDatailContainer>

                {!data.pastMeetup && (
                    <ButtonSubscribe onPress={onSubscribe}>
                        <SubscribeText>Realizar Inscrição</SubscribeText>
                    </ButtonSubscribe>
                )}

           


            </DetailContainer>
            

            
        </Container>
    );
}
