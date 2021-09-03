import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { get, post } from '../../api/userApi';
import url from '../../constants/url';
import { ACCESS_TOKEN } from '../../constants/storageKeys'
import strings from '../../constants/strings';


export default class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            selectedItems: [],
            data: [],
            isloading: true
        }
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        await this.getSkills(token)
        this.getDetails(token)
    }

    getDetails = async (token) => {
        const { data } = await get(url.GET_DETAILS, token)
        const { firstName, lastName, skills } = data
        var previousSkills = []
        skills.map((skillName) => {
            previousSkills = [...previousSkills, { skillName }]
        })
        //console.log(previousSkills)
        this.setState({ firstName, lastName, previousSkills, isloading: false })
        

    }

    getSkills = async (token) => {
        const resp = await get(url.GET_SKILLS, token);
        this.setState({ data: resp.data })
    }

    onSelectedItemsChange = selectedItems => {
        if (selectedItems.length > 8) {
            alert("Maximum eight skills can be selected")
            return // snackbar "max limit reached"
        }
        this.setState({ selectedItems });
    };

    submit = async () => {
        this.setState({isloading : true});
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if (this.state.firstName == "") {
            alert("Please enter first name")
            return // snackbar for invalid name or invalid skills
        }
        if (this.state.lastName == "") {
            alert("Please enter last name")
            return // snackbar for invalid name or invalid skills
        }

        if (this.state.selectedItems < 3) {
            alert("Minimum three skills should be selected")
            return
        }


        const resp = await post(
            {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName
            },
            url.UPDATE_NAME,
            token
        )

        const { firstName, lastName } = resp.data
        this.setState({ firstName, lastName })
        //name updated

        var skillSet = new Set()
        this.state.data.map((skills) => {
            this.state.selectedItems.map((skill) => {
                if (skill == skills.skillName) {
                    skillSet.add(skills.skillName);
                }
            })
        })

        var body = Array.from(skillSet);
        const resp2 = await post(
            {
                "skills": body
            },
            url.UPDATE_SKILL,
            token
        )
        this.setState({isloading: false})
        this.props.navigation.navigate("Dashboard");
    }


    render() {
        const { selectedItems } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>First Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder="First Name" value={this.state.firstName} onChangeText={(firstName) => { this.setState({ firstName: firstName }) }} />
                </View>
                <Text style={styles.headerText}>Last Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder="Last Name" value={this.state.lastName} onChangeText={(lastName) => { this.setState({ lastName: lastName }) }} />
                </View>

                <View style={{ marginVertical: 20 }}>
                    <MultiSelect
                        items={this.state.data}
                        uniqueKey="skillName"
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="  Pick Skills"
                        searchInputPlaceholderText="Search Items..."
                        altFontFamily="ProximaNova-Light"
                        tagBorderColor='#ffd700'
                        tagTextColor='#ffd700'
                        displayKey="skillName"

                        searchInputStyle={{ color: '#CCC' }}

                    />
                </View>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => this.submit()}>
                    <Text style={styles.signinText}>Submit</Text>
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
        flexDirection: 'column',
        padding: 20,
        backgroundColor: 'white'
    },

    inputView: {
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
        color: "#000000",
        marginVertical: 10
    },
    headerText: {
        fontWeight: 'bold',
        margin: 10,
    },
    submitBtn: {
        backgroundColor: `#ffd700`,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    signinText: {
        color: "white"
    }
});