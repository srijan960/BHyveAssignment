import React,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../constants/storageKeys'
import AnimatedSplash from "react-native-animated-splash-screen";

export default class Splash extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoaded : false
        }
    }
     componentDidMount(){
        this.handleLogin();
        this.setState({ isLoaded: true })
       
    }

    handleLogin=async()=>{
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if(token){
            this.props.loggedIn()
        }
        
        setTimeout(()=>{
            this.props.splashComplete()
        },2000)

    }


    render(){
        return (
            <AnimatedSplash
              translucent={true}
              logoImage={require('../assets/bhyvelogo.png')}
              backgroundColor={'white'}
              logoHeight={150}
              logoWidth={150}
            >
            </AnimatedSplash>
          );
    }
}