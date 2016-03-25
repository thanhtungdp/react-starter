import {EventEmitter} from 'fbemitter'
import AppDispatcher from './AppDispatcher'
import {ReduceStore} from 'flux/utils'
import bankConstants from './constants'


class BankBalanceStore extends ReduceStore {
    getInitialState() {
        return 0;
    }

    reduce(state, action) {
        switch (action.type) {
            case bankConstants.CREATED_ACCOUNT:
                return 0;
            case bankConstants.DEPOSITED_INTO_ACCOUNT:
                return state + action.amount;
            case bankConstants.WITHDREW_FROM_ACCOUNT:
                return state - action.amount;
            default:
                return 0;
        }
    }
}


export default new BankBalanceStore(AppDispatcher)