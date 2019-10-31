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
import styles from '../source/style.js'
import AsyncStorage from '@react-native-community/async-storage'

class loginScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            username : '',
            password : ''
        }
    }

    async componentDidMount(){
        await this.SessionTokenCheck()
    }

    async SessionTokenCheck(){
        try{
            const Tokenize = await AsyncStorage.getItem('uToken')
            if(Tokenize !==null){
                return this.props.navigation.navigate('Checkin')
            }
        }catch(error){
            console('U must login First')
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
                console.log(response)
                if(typeof response.data.token !== 'undefined'){
                    AsyncStorage.setItem('uToken', response.data.token)
                    console.log(response.data.token)
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
          <View style={styles.content}>
            <Text style={styles.label}>username</Text>
            <Input  style={styles.Input} onChangeText={(username)=>{this.setState({username})}} value={this.state.username} />           
            <Text style={styles.label}>password</Text>
            <Input  style={styles.Input} onChangeText={(password)=>{this.setState({password})}} value={this.state.password} />
            <TouchableOpacity style={styles.oneButton} onPress={()=>this.login()}>
                            <Text style={styles.TextButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        )
    }
}

export default loginScreen