import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import {Input, Header} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../source/style'
import Icon from 'react-native-vector-icons/Feather'

class settingScreen extends Component {


    constructor(props){
        super(props)
        this.state={
           Token: ''
        }
    }

    componentDidMount(){
        this.SessionTokenCheck()
    }

    async SessionTokenCheck(){
        try{
            const Tokenize = await AsyncStorage.getItem('uToken')
            console.log(Tokenize)
            if(Tokenize !==null){
                this.setState({Token: Tokenize})
                console.log('Token :', Token)
                return Tokenize
            }
        }catch(error){
            console.log('U must login First')
        }
    }

    

    render(){
        return(
            <View>
            <Header style={styles.header}>
                <Text style={styles.TextButton}>Setting</Text>
            </Header>
            <View style={{flexDirection:'row'}}>
                <View style={{margin:10, width: 340, height: 100, justifyContent:'center', flexDirection:'row'}}>
                <Image style={{ left:-30, top: 10, borderWidth: 1, width: 70, height: 70, justifyContent:'center', borderRadius:100}} source={{uri: 'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg'}} />
                    <View style={{ justifyContent:'center'}}>
                    <Text style={styles.label}>
                       Paman Tat
                    </Text>
                    </View>
                    <TouchableOpacity style={{bottom:-100, left:-70}}  onPress={()=>{AsyncStorage.removeItem('uToken',()=>{this.props.navigation.navigate('login')})}} >
                        <Icon name='log-out' size={50} />
                    </TouchableOpacity> 
                </View>                 
            </View>
        </View>
        )
    }
}

export default settingScreen