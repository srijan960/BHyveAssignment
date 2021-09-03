import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { authenticate } from '../api/userApi';
import { ACCESS_TOKEN, USER_DATA } from '../constants/storageKeys'
import url from '../constants/url';


export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isloading: false
        }
    };

    signIn = async () => {
        if (this.state.email == '') {
            console.log('empty');
            alert('Please Enter Email');
            return;
        }
        if (this.state.password == '') {
            console.log('empty');
            alert('Please Enter Password');
            return;
        }
        this.setState({ isloading: true })
        var response = await authenticate({
            "username": this.state.email,
            "password": this.state.password
        }, url.LOGIN);

        await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(response.data.accessToken))
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(response.data.user))
        this.setState({ isloading: false }, () => {
            this.props.signinSuccess()
        })

    }

    render() {
        return (

            <View style={styles.container}>
                <Image style={styles.img} source={require('../assets/bhyvelogo.png')} />
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.email}
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.password}
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        onChangeText={text => this.setState({ password: text })} />
                </View>

                <TouchableOpacity
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    style={styles.SigninBTtn}
                    onPress={this.signIn}>
                    <Text style={styles.signinText}>Sign in</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.isloading && <ActivityIndicator color={`#ffd700`} size='large' />}
      </View>


            </View>
             
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        borderColor: `#ffd700`,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: `#fffaf0`,
    },
    inputText: {
        height: 50,
        color: `#696969`,
    },

    SigninBTtn: {
        width: "80%",
        backgroundColor: `#ffd700`,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    signinText: {
        color: "white"
    },
    img: {
        height: 150,
        width: 200,
        resizeMode: 'center'
    }
});