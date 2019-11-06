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
                    AsyncStorage.setItem('userName', response.data.username)
                    console.log(response)
                    this.props.navigation.navigate('Customer')
                }else{
                    alert(response.data.message)
                }
            })
        }catch(e){
            console.log()
        }
    }



    render(){
        return(
        <View >
            <View style={styles.Container}>
            <Text style={[styles.Title,{marginTop:20}]}>MucAbleSpace</Text>
            <Image style={{width:150, height:150, borderRadius: 100, marginTop:10}} source={require('../source/images/Free_Sample_By_Wix.png')} />
                <View style={styles.Content}>
                    <View style={styles.subContent}>
                       <View style={styles.Card}>
                            <Text style={styles.label}>username</Text>
                            <Input  style={styles.input} onChangeText={(username)=>{this.setState({username})}} value={this.state.username} />           
                            <Text style={styles.label}>password</Text>
                            <Input  style={styles.input} onChangeText={(password)=>{this.setState({password})}} value={this.state.password} secureTextEntry={true} />
                                <TouchableOpacity style={[styles.Button,{alignSelf:'center'}]} onPress={()=>this.login()}>
                                    <Text style={[styles.labelButton,{alignSelf:'center', textAlignVertical:'center'}]}>Login</Text>
                                </TouchableOpacity>
                       </View>
                    </View>
                </View>
            </View>
        </View>
        )
    }
}

export default loginScreen