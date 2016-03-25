import React,{Component} from 'react';
import {render} from 'react-dom';
import BankRewardStore from './BankRewardStore';
import BankBalanceStore from './BankBalanceStore'
import BankActions from './BankActions'
import {Container} from 'flux/utils'

class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
    }

    validateAmount() {
        if (this.refs.ammount.value == 0 || this.refs.ammount.value == '') {
            this.setState({validate: false});
            console.log(this.state.validate);
            return false;
        }
        else {
            this.setState({validate: true});
            return true;
        }
    }

    deposit() {
        this.validateAmount();
        BankActions.depositIntoAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    withdraw() {
        this.validateAmount();
        BankActions.withdrawFromAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    render() {
        return (
            <div>
                <header>FluxTrust Bank</header>
                <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
                <h2>Your points Rewards Tier is {this.state.rewardsTier}</h2>
                <div className="atm">
                    <input type="text" placeholder="Enter Ammount" ref="ammount"/>
                    {!this.state.validate ? (
                        <p>Amount muse be > 0</p>
                    ) : ''}
                    <br/>
                    <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                </div>
            </div>
        )
    }
}
//Multiple stores here
App.getStores = () => ([BankBalanceStore, BankRewardStore]);
//Map store state to local component's state
App.calculateState = (prevState) => ({
    balance: BankBalanceStore.getState(),
    rewardsTier: BankRewardStore.getState()
});

const AppContainer = Container.create(App);

render(<AppContainer/>, document.getElementById('root'))