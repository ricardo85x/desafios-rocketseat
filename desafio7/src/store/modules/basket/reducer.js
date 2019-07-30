import produce from 'immer';

export default function basket(state = [], action) {
    console.tron.log('MA OI', action);
    switch (action.type) {
        case '@basket/ADD_SUCCESS':
            return produce(state, draftProduct => {
                const { product } = action;
                draftProduct.push(product);
            });

        case '@basket/REMOVE':
            return produce(state, draftProduct => {
                const productIndex = draftProduct.findIndex(
                    p => p.id === action.id
                );

                if (productIndex >= 0) {
                    draftProduct.splice(productIndex, 1);
                }
            });
        case '@basket/UPDATE_AMOUNT':
            return produce(state, draftProduct => {
                const productIndex = draftProduct.findIndex(
                    p => p.id === action.id
                );

                if (productIndex >= 0) {
                    if (Number(action.amount) <= 0) {
                        draftProduct.splice(productIndex, 1);
                    } else {
                        draftProduct[productIndex].amount = Number(
                            action.amount
                        );
                    }
                }
            });

        default:
            return state;
    }
}
