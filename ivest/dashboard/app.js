"use strict";var _ReactRouterDOM=ReactRouterDOM;var HashRouter=_ReactRouterDOM.HashRouter;var Switch=_ReactRouterDOM.Switch;var Route=_ReactRouterDOM.Route;var Link=_ReactRouterDOM.Link;var FormGroup=Reactstrap.FormGroup;var Form=Reactstrap.Form;var Input=Reactstrap.Input;var Button=Reactstrap.Button;var Label=Reactstrap.Label;var Alert=Reactstrap.Alert;class Home extends React.Component{constructor(props){super(props);this.state={posts:[],main:props.main,loading:true,html:'<div>'+document.getElementById('app').innerHTML+'</div>'};this.updateState=this.updateState.bind(this)}
updateState(args){this.props.updateState(args);}
componentDidMount(){if(this.mounted)return;this.mounted=true;const home=this;fetch('/react/home',{credentials:"same-origin"}).then(function(response){return response;}).then(function(response){return response.text();}).then(function(data){home.updateState({loading:true});home.setState({html:data})
setTimeout(function(){initializeChart();ReactDOM.render(<LoadForm ercAddress={home.state.main.addresses.erc}updateState={home.updateState}balance={home.state.main.balances.erc.grx}symbol={'GRX'}/>,
                    document.getElementById('grx-load-form'));
                    ReactDOM.render(<WithdrawForm ercAddress={home.state.main.addresses.erc} updateState={   home.updateState }   balance={ home.state.main.balances.erc.grx } symbol={ 'GRX' } />,document.getElementById('grx-withdraw-form'));ReactDOM.render(<WithdrawForm ercAddress={home.state.main.addresses.erc}updateState={home.updateState}balance={home.state.main.balances.erc.grx}symbol={'ETH'}/>,
                        document.getElementById('eth-withdraw-form'));
                    ReactDOM.render(<WithdrawForm ercAddress={home.state.main.addresses.erc} updateState={   home.updateState }   balance={ home.state.main.balances.erc.grx } symbol={ 'BTC' } />,document.getElementById('btc-withdraw-form'));ReactDOM.render(<LoadForm ercAddress={home.state.main.addresses.erc}updateState={home.updateState}balance={home.state.main.balances.erc.eth}symbol={'ETH'}/>,
                        document.getElementById('eth-load-form'));
                    ReactDOM.render(<LoadForm ercAddress={home.state.main.addresses.erc} updateState={   home.updateState }   balance={ home.state.main.balances.erc.eth } symbol={ 'BTC' } />,document.getElementById('btc-load-form'));},500);}).catch(function(e){console.log(e)})}
componentWillUnmount(){this.mounted=false;}
render(){return React.createElement("div",{key:location.pathname},<div key={location.pathname}><span dangerouslySetInnerHTML={{__html:this.state.html.replace(/(<? *script)/gi,'<!-- illegalscript --><')}}></span></div>)}}
class Main extends React.Component{constructor(props){super(props);var init={posts:[],html:"",loading:true,balances:{erc:{grx:$('#erc-grx-balance').html(),eth:2},grx:0,eth:0,btc:0,usd:0},load_form:{grx:{},eth:{},},};this.state=Object.assign(init,_init)
this.updateState=this.updateState.bind(this)}
updateState(args){console.log('We pass argument from Child to Parent: '+ JSON.stringify(args));this.setState(args);return this.state;}
componentDidMount(){}
componentDidUpdate(){ReactDOM.render(React.createElement(Loader,{show:this.state.loading}),document.getElementById('loader'));}
render(){const main=this;return React.createElement("div",null,React.createElement(Switch,null,<Route path="/"render={()=><div><Home main={main.state}updateState={this.updateState}/></div>}/>
            )
        );
    }
};

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.signOut=this.signOut.bind(this)
    }
    signOut() {
        $('#logout-form').submit()
    }
    render() {
        return (
            <div className="loader-div" style={{ visibility: this.props.show?'visible':'hidden' }}  >

                <div className="centered coming-soon" style={{ textAlign:'center'}}>
                    <img src="/img/loader.gif" style={{ width: '60px', visibility:'hidden' }}  />
                <h3>Gamify . Trade . Lend . Stake</h3>
                <h4>Coming Soon</h4>
                    <a className="btn btn-info" style= {{ background:'#3acc23', border: '1px solid #fff' }} href="/ico"> ICO Contributions Page</a>
                    <p></p>
                    <p><a href="#" onClick={ this.signOut } > Sign Out  </a>
                   </p>
                </div>

            </div>
        )
    }
}

class App extends React.Component {
    componentDidMount() {
        this.setState({
            loading:false
        })
        document.body.style.visibility='visible'

    }
    render() {
        return React.createElement(
            "div",
            null,

            React.createElement(Main, null)
        );
    }
};
class LoadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: this.props.balance,
            symbol: this.props.symbol,
            error: ''
        };
        this.updateState = this.updateState.bind(this);
        this.load = this.load.bind(this);
       // console.log (JSON.stringify(this.state))
    }
    notify() {
        $('.top-right').notify({
            // options
            message: 'address copied to clipboard'
        },{
            // settings
            type: 'default'
        }).show();
    }
    load() {
        const main =this;
        this.setState({loading: true});
        this.updateState({'loading':true})
        fetch('/react/load/'+this.state.symbol, {
            credentials: "same-origin"
        })
            .then( function(response) {
                main.updateState({'loading':false})
                setTimeout(function () {
                    main.setState({error:''})
                }, 50000)
                return response;
            })
            .then( function(response) {
                main.setState({loading: false});

                return response.json();
            })
            .then( function(data) {
                if(data.error) {
                    main.setState({error: data.error})
                    return;
                }
                notify("Loading successful!")
                //console.log(data)
            }).catch(function() {

                main.setState({error: "An error occurred.Please try again."})
                return;

        })
    }
    componentDidMount() {

        ReactDOM.render(<Button disabled={ this.state.loading } onClick={ this.load } className="btn btn-primary">{ this.state.loading?'Please wait':'Load '+this.state.symbol }</Button>, document.getElementById('load-'+this.props.symbol+'-button'));

    }
    componentDidUpdate() {

        ReactDOM.render(<Button disabled={ this.state.loading } onClick={ this.load } className="btn btn-primary">{ this.state.loading?'Please wait':'Load '+this.state.symbol }</Button>, document.getElementById('load-'+this.props.symbol+'-button'));

    }
    updateState(args){
        this.props.updateState(args)

    }
    render() {
        return (
            <Form>
                <div className="callout callout-info">
                    Please send GRX to the address provided below and click the "Load" button after the transaction has been confirmed on the blockchain.
                </div>
                <FormGroup style={{display: (this.state.error==''?'none':'')}}>
                    <div className="callout callout-danger" >
                        { this.state.error }
                    </div>
                </FormGroup>
                <div className="box-body">

                    <HardWallet ercAddress={ this.props.ercAddress } load={ this.load } updateState={ this.updateState } balance={ this.state.balance } symbol={ this.state.symbol } />
                </div>
            </Form>
        )
    }
}
class WithdrawForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: this.props.balance,
            symbol: this.props.symbol,
            error: '',
            address: '',
            amount: ''
        };
        this.updateState = this.updateState.bind(this);
        this.load = this.load.bind(this);
        this.changeText = this.changeText.bind(this);
        // console.log (JSON.stringify(this.state))
    }
    componentDidMount() {

        ReactDOM.render(<Button disabled={ this.state.loading } onClick={ this.load } className="btn btn-primary">{ this.state.loading?'Please wait':'Withdraw '+this.state.symbol }</Button>, document.getElementById('withdraw-'+this.props.symbol+'-button'));

    }

    load() {
        const main =this;
       // console.log(this.updateState({}))
        if(main.state.address=='') {
            main.setState({error: 'You must provide a receiving address'})
            return;
        }

        if(main.state.amount=='') {
            main.setState({error: 'You must provide an amount'})
                return;
        }
        if(main.props.symbol!='BTC' && !isAddress(main.state.address)) {
            main.setState({error: main.state.address+' is not a valid ethereum address'})
            return;
        }
        if(main.props.symbol=='BTC' && !check(main.state.address)) {
            main.setState({error: main.state.address+' is not a valid bitcoin address'})
            return;
        }

        this.setState({loading: true});
        this.updateState({'loading':true})
       // console.log(main.state.address)
        fetch('/react/withdraw/'+this.state.symbol, {
            credentials: "same-origin"
        })
            .then( function(response) {
                main.updateState({'loading':false})
                setTimeout(function () {
                    main.setState({error:''})
                }, 50000)
                return response;
            })
            .then( function(response) {
                main.setState({loading: false});

                return response.json();
            })
            .then( function(data) {
                if(data.error) {
                    main.setState({error: data.error})
                    return;
                }
                notify("Loading successful!")
               // console.log(data)
            }).catch(function() {

            main.setState({error: "An error occurred.Please try again."})
            return;

        })
    }
    updateState(args){
        this.props.updateState(args)

    }
    changeText(event){
        var field=event.target.name;

        this.setState(
            JSON.parse('{  "'+field+'" : "'+event.target.value+'" }')
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ denom: nextProps.denom })
    }
    render() {
        return (
            <Form>
                <div className="callout callout-info">
                    Fill the form below to withdraw { this.state.symbol } to any address
                </div>
                <FormGroup style={{display: (this.state.error==''?'none':'')}}>
                    <div className="callout callout-danger" >
                        { this.state.error }
                    </div>
                </FormGroup>
                <div className="box-body">
                    <FormGroup id="hard-wallet">
                        <label htmlFor="">Receiving Address</label>
                        <Input type="text" id="" name={ 'address'}  onChange = {this.changeText} defaultValue={ this.state.address } />
                    </FormGroup>
                    <FormGroup id="hard-wallet">
                        <label htmlFor={ this.state.symbol+'-amount'}>Amount</label>
                        <Input type="number" steps="0.000000001" name={ 'amount'}    id={ this.state.symbol+'-amount'} defaultValue={ this.state.amount }  onChange = {this.changeText} placeholder={'Amount'} />
                    </FormGroup>
                    </div>
            </Form>
        )
    }
}
class HardWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            balance: this.props.balance,
            symbol: this.props.symbol
        };
       this.load = this.props.load;
      //  this.state = Object.assign(init, _init )
        this.updateState = this.updateState.bind(this)
      //  console.log (JSON.stringify(this.state))
    }

    updateState(args){
       this.props.updateState(args)

    }


    render() {

        return (

            <FormGroup className="callout callout-default" style={{ border: '1px solid #ccc', padding: '10px' }}>

                <label htmlFor="hard-wallet">Hard Wallet</label>
                <FormGroup id="hard-wallet">
                    <p className="help-block">
                        Address:  <b>{ this.props.ercAddress }</b>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CopyToClipboard text={ this.props.ercAddress }
                                         onCopy={() => this.notify() }>
                            <a href="#"><i className="fa fa-copy"></i></a>
                        </CopyToClipboard>

                       &nbsp;&nbsp;
                        <a href="" title="QR Code" data-amount="" data-address="{this.props.ercAddress}" className="qr-button-ETH">
                            <i className="fa fa-qrcode"></i>
                        </a>
                    </p>
                </FormGroup>
                <FormGroup>
                    <ERCBalance balance={ this.state.balance } updateState={ this.props.updateState} symbol={ this.state.symbol } />
                </FormGroup>
                <div className="text-center" align="center">
                    <div style={{ width:'150px', margin: 'auto' }}  id="qrcode"></div>
                </div>
            </FormGroup>
        )
    }
}

class ERCBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: this.props.balance
        };
        this.updateState = this.updateState.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
       // console.log (JSON.stringify(this.state))
    }

    updateState(arg){

        var main = this;
        main.props.updateState(arg)


    }
    updateBalance(){
       const main = this;
       main.updateState({'loading':true});
        fetch('/react/balance/erc/'+main.props.symbol.toLowerCase(), {
            credentials: "same-origin"
        })
            .then( function(response) {
                main.updateState({'loading':false})
                return response;
            })
            .then( function(response) {

                return response.json();
            })
            .then( function(data) {

                main.setState({
                    balance: data.result
                })
                main.updateState({
                    balances: {
                        erc: {
                            grx: data.result
                        }
                    }
                })

              //  console.log(data)
            }).catch( function(e) {
          //  console.log(e)

        })


    }
    render() {
        const main =this;
        return (
            <p  className="help-block" id="loader-balance">
                Balance:   <b><span>{ main.state.balance } {  main.props.symbol }</span></b> &nbsp;&nbsp;<a href="#" onClick={ main.updateBalance }><i className="fa fa-refresh"></i></a>
            </p>
        )
    }
}
// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs

ReactDOM.render(React.createElement(
    HashRouter,
    null,
    React.createElement(App, null)
), document.getElementById('app'));

//ReactDOM.render(React.createElement(Loader, null), document.getElementById('loader'));