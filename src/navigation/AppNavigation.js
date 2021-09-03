import React,{Component} from 'react';
import Dashboard from '../screens/LoggedIn/Dashboard';
import EditProfile from '../screens/LoggedIn/EditProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View,Text } from 'react-native';
import Splash from '../screens/Splash';
import SignInScreen from '../screens/SignInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <View>

        </View>
    );
}

const LoggedIn = () => (
    <Stack.Navigator
        initialRouteName="EditProfile"
    >
    <Stack.Screen name="Dashboard"
     component={Dashboard}/>
    <Stack.Screen  name="EditProfile"
    component={EditProfile}
    options ={{title: 'Edit Profile'}} />
    <Stack.Screen name="SignIn"
     component={SignInScreen}/>
  </Stack.Navigator>
)

export default class AppNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            isSignedIn:false,
            loading:true,
        }
    }

    alreadySignedIn=()=>{
        this.setState({isSignedIn:true})
    }

    signinSuccess=()=>{
        this.setState({isSignedIn:true})
    }

    splashComplete=()=>{
        this.setState({loading:false})
    }

    logout=()=>{
        AsyncStorage.clear()
        this.setState({isSignedIn:false})
    }

    render(){
        return(
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',AlignItems:'center'}}>

                {
                    this.state.loading ? <Splash splashComplete={this.splashComplete} loggedIn={this.alreadySignedIn} /> :
                    this.state.isSignedIn ? 
                        <ThemeContext.Provider value={this.logout}>
                            <LoggedIn/>
                        </ThemeContext.Provider>
                        :
                        <SignInScreen signinSuccess={this.signinSuccess} />
                    
                }
                {/* <LoggedIn/> */}
            </View>
        )
    }
}
export const ThemeContext = React.createContext(true)
