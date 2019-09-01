import React from 'react';

import {useSelector} from 'react-redux';
import CustomStatusBar from '~/components/CustomStatusBar';
import createRouter from '~/routes';

export default function App() {
    const signed = useSelector(state => state.auth.signed);

    const Routes = createRouter(signed);
    return (<>
        <CustomStatusBar/>
        <Routes />
    </>);
}
