import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Banner,BannerContainer, DetailContainer, Title,ButtonSubscribe, SubscribeText,  ItemDatailContainer, ItemText} from './styles';

export default function Meetup({data: {item: data }, onSubscribe}) {
    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,
        });
    }, [data.date]);

    console.tron.log({item: data.title, banner: data.banner})

    return (
        <Container past={data.past}>

            <BannerContainer>
                <Banner source={{
                        uri: data.banner
                            ? data.banner.url.replace('localhost', '10.0.2.2')
                            : `https://api.adorable.io/avatar/50/${data.title}.png`,
                    }} />

            </BannerContainer>

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
