import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Modal,
    TextInput,
    
} from 'react-native'
import {Input} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import AsyncStorage from '@react-native-community/async-storage'

class loginScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            username : '',
            password : ''
        }
    }

    login = async () => {
        try{
            let temp= {
                username: this.state.username,
                password: this.state.password
            }
            await axios.post(`${ip}/api/v2/login`, temp)
            .then((response)=>{
                if(typeof response.data.token !== 'undefined'){
                    AsyncStorage.setItem('uToken', response.data.token)
                    AsyncStorage.setItem('User', JSON.stringify(response.data.user.id))
                    console.log(response.data.user)
                    this.props.navigation.navigate('Customer')
                }
            })
        }catch(e){
            console.log(e)
        }
    }



    render(){
        return(
        <View>
            <Text>username</Text>
            <Input  style={{borderWidth:2, width:270, height: 200}} onChangeText={(username)=>{this.setState({username})}} value={this.state.username} />           
            <Text>password</Text>
            <Input  style={{borderWidth:2, width:270, height: 200}} onChangeText={(password)=>{this.setState({password})}} value={this.state.password} />
            <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.login()}>
                            <Text style={{textAlign:'center'}}>Login</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

export default loginScreen