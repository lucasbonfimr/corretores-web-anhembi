import './styles.css';
import React, {Component, ReactText} from 'react';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import { Input, PageHeader, Rate } from 'antd';
import { SearchInput, IconButton, Button, Popover, Menu, Avatar, Combobox, Text, Textarea, TagInput, Icon,
    Pane, SideSheet, Heading, Paragraph, Tablist, Tab, Card, Table, TabNavigation, Badge, Label, toaster} from 'evergreen-ui';
import ReactStarsRating from 'react-awesome-stars-rating';

const facebook = {
  appId: "YOUR FB APP ID GOES HERE",
  cookie: true,
  xfbml: true,
  version: "v3.2",
  scope: "email"
};

const google = {
  client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
  scope: "profile email"
};
export default class History extends Component {
    constructor(props){
    super(props);
    this.state = {
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      recoverPasswordSuccess: null,
      showSocialMedia: true,
      selectedIndex: 0,
      filterList: [],
      filter: '',
      value: '',
      list: [],
      isaMessage: false,
    };
    }

    onLogin() {
      console.log('__onLogin__');
      console.log('email: ' + document.querySelector('#email').value);
      console.log('password: ' + document.querySelector('#password').value);
  
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      if (!email || !password) {
        this.setState({
          error: true
        })
      } else {
        this.onLoginSuccess('form');
      }
    }
  
    onRegister() {
      this.props.history.push('/register');
    }
  
    onRecoverPassword() {
      console.log('__onFotgottenPassword__');
      console.log('email: ' + document.querySelector('#email').value);
  
      const email = document.querySelector('#email').value;
  
  
      if (!email) {
        this.setState({
          error: true,
          recoverPasswordSuccess: false
        })
      } else {
        this.setState({
          error: null,
          recoverPasswordSuccess: true
        });
      }
    }
  
    openModal(initialTab) {
      this.setState({
        initialTab: initialTab
      }, () => {
        this.setState({
          showModal: true,
        })
      });
    }
  
    onLoginSuccess(method, response) {
  
      this.closeModal();
      this.setState({
        loggedIn: method,
        loading: false
      })
    }
  
    onLoginFail(method, response) {
  
      this.setState({
        loading: false,
        error: response
      })
    }
  
    startLoading() {
      this.setState({
        loading: true
      })
    }
  
    finishLoading() {
      this.setState({
        loading: false
      })
    }
  
    afterTabsChange() {
      this.setState({
        error: null,
        recoverPasswordSuccess: false,
      });
      if(this.state.showSocialMedia){
        this.setState({
          showSocialMedia: false
        })
      }else{
        this.setState({
          showSocialMedia: true
        })
      }
    }
  
    closeModal() {
      this.setState({
        showModal: false,
        error: null
      });
    }

    onAddMessage = () => {
      this.setState({isaMessage: true })
      this.setState(state => {
        const list = [...state.list, state.value];
        return {
          list,
          value: '',
        };
      });
    };

    onAddFilter = () => {
      this.setState(state => {
        const filterList = [...state.filterList, state.filter];
        return {
          filterList,
          filter: '',
        };
      });
    };
    
    render(){
    const loggedIn = this.state.loggedIn
    const isLoading = this.state.loading;
    const onChange = (value) => {
        console.log(`React Stars Rating value is ${value}`);
      };
    const FilterRating = ({ value }) => {
        return <ReactStarsRating onChange={onChange} value={value} />;
    };
    const VendorRating = ({ value }) => {
        return <ReactStarsRating value={5} isEdit={false} />;
      };

    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={() => this.props.history.push('/') } icon="home">Pagina Inicial</Menu.Item>
                <Menu.Item icon="star-empty">Curriculos da Equipe</Menu.Item>
                <Menu.Item icon="history">
                  Historico
                </Menu.Item>
              </Menu.Group>
              <Menu.Divider />
            </Menu>
          }
        >
          <IconButton style={{position: 'fixed'}} className="menu-button" appearance="minimal" icon="menu" iconSize={50} />
        </Popover>
        <br />
        <br />
        <SearchInput top={20} marginLeft={360} width={700} height={40} position="fixed" placeholder="Procure um seguro" />
        {!!loggedIn ? 
        <Avatar
          style={{marginLeft: 1320, marginTop: 15, position: 'fixed'}}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
          name="Alan Turing"
          size={40}
        />
        : 
        <Button
          style={{marginLeft: 1210, marginTop: 15, position: 'fixed'}}
          className="RML-btn"
          onClick={() => this.openModal('login')}
          appearance="minimal"
        >
        Entre ou cadastre-se
        </Button>
        }
        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={isLoading}
          initialTab={this.state.initialTab}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),

            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
              ? {
                  label: "Uma nova senha foi enviada para seu e-mail!"
                }
              : null,
            recoverPasswordAnchor: {
              label: "Esqueceu sua senha?"
            },
            loginBtn: {
              label: "Entre"
            },
            registerBtn: {
              label: "Cadastre-se"
            },
            recoverPasswordBtn: {
              label: "Envie uma nova senha"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
            ],
          }}
          separator={{
            label: this.state.showSocialMedia ? "ou" : "Para se cadastrar, clique no botao abaixo: "
          }}
          providers={{
            facebook: this.state.showSocialMedia ? {
              config: facebook,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Facebook"
            } : null,
            google: this.state.showSocialMedia ? {
              config: google,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Google"
            } : null
          }}
        />
        {loggedIn}
      </div>
    </header>
    <div>
        <TabNavigation position='fixed' backgroundColor='#E26B15' width={1500} marginLeft={-10}>
        {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
            <Tab marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
            onSelect={() => this.props.history.push('/search')}>
            {tab}
            </Tab>
        ))}
        </TabNavigation>
    </div>
    <div>
    <body>
    <div style={{position: 'fixed', marginLeft: 30, marginTop: 100, width: 300, float: 'left', 
    height: 300, borderRight: '1px solid rgb(214, 206, 200)' }}>
    <Heading size={700} marginBottom={10}>Historico</Heading>
    </div>
    <div>
    <div style={{position: 'fixed', marginLeft: 700, marginTop: 210, width: 300, float: 'left'}}>
    <Heading size={200} marginBottom={10}>Ops! Parece que seu historico esta vazio...</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 800, marginTop: 240, width: 300, float: 'left'}}>
    <Icon color='disabled' size={40} icon="history"> </Icon>
    </div>
    </div>
    </body>
    </div>
    </div>
    )}
    }