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
           Token: '',
           username: '',
        }
    }

    componentDidMount(){
        this.SessionTokenCheck()
    }

    async SessionTokenCheck(){
        try{
            const Tokenize = await AsyncStorage.getItem('uToken')
            const Usernize = await AsyncStorage.getItem('userName')
            console.log(Usernize)
            if(Tokenize !==null){
                this.setState({Token: Tokenize, username: Usernize})
                return Tokenize
            }
        }catch(error){
            console.log(Usernize)
        }
    }

    

    render(){
        return(
            <View>
            <Header style={styles.header}>
                <Text style={styles.Title}>Setting</Text>
            </Header>
            <View style={[styles.Container,{borderBottomEndRadius: 100}]}>
            <View style={styles.Content} >
                <View style={{flexDirection:'row'}}>
                    <View style={{margin:10, width: 340, height: 100, justifyContent:'center', flexDirection:'row'}}>
                    <Image style={{ left:-30, top: 10, borderWidth: 1, width: 70, height: 70, justifyContent:'center', borderRadius:100}} source={{uri: 'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg'}} />
                        <View style={{ justifyContent:'center'}}>
                        <Text style={styles.label}>
                            {this.state.username}
                        </Text>
                        </View>
                    </View>                 
                </View>
            </View>
            </View>
            <TouchableOpacity style={{bottom:-25, left:150}}  onPress={()=>{AsyncStorage.removeItem('uToken',()=>{this.props.navigation.navigate('login')})}} >
                            <Icon name='log-out' size={100}  color='red'/>
            </TouchableOpacity> 
            </View>
        )
    }
}

export default settingScreen