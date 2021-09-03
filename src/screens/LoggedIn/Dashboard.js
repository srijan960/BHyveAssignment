import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, DevSettings } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { ThemeContext } from '../../navigation/AppNavigation';
import { get, post } from '../../api/userApi';
import url from '../../constants/url';
import { ACCESS_TOKEN } from '../../constants/storageKeys'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            skills: [],

        }
    }
    componentDidMount() {
        this.getDetails()

    }

    logout=()=>{
        AsyncStorage.clear()
        DevSettings.reload();
        this.props.navigation.navigate("SignIn");
    }

    getDetails = async () => {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        const { data } = await get(url.GET_DETAILS, token)
        const { firstName, lastName, username, skills } = data
        this.setState({ firstName, lastName, username, skills })



    }



    render() {
        const skillObj = this.state.skills.map((str) => ({ skill: str }));

        return (
            <View>
                <Text style={styles.headingText} >
                    First Name
                </Text>
                <TextInput placeholder="fffff" style={styles.styleText} value={this.state.firstName} editable={false} />
                <View style={styles.lineStyle} />
                <Text style={styles.headingText}>
                    Lasr Name
                </Text>
                <TextInput placeholder="fffff" style={styles.styleText} value={this.state.lastName} editable={false} />
                <View style={styles.lineStyle} />
                <Text style={styles.headingText}>
                    Email
                </Text>
                <TextInput placeholder="fffff" style={styles.styleText} value={this.state.username} editable={false} />
                <View style={styles.lineStyle} />
                <Text style={styles.headingText}>
                    Skills
                </Text>
                <FlatList
                    keyExtractor={skillObj => skillObj.skill}
                    data={skillObj}
                    renderItem={({ item }) => {
                        return (<View>

                            <Text style={styles.listTextItem}>{item.skill}</Text>
                            <View style={styles.listLineStyle} />
                        </View>
                        );
                    }
                    } />

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => this.logout()}>
                    <Text style={{color : 'white'}}>Logout</Text>
                </TouchableOpacity>


            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headingText: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 18,
        color: `#000000`,
        marginTop: 10
    },
    styleText: {
        fontSize: 15,
        color: 'black',
        marginHorizontal: 10
    },

    lineStyle: {
        borderWidth: 1,
        borderColor: 'grey',
    },

    listLineStyle: {
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    listTextItem: {
        fontSize: 15,
        color: 'black',
        margin: 10
    },
    logoutBtn: {
        backgroundColor:`#ffd700`,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        flexDirection:'row',
        alignItems:'center',
    }
})