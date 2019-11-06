import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Modal from 'react-native-modal'
import {Input, Header} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import { ScrollView } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import * as act from '../_redux/_actions/room'
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../source/style'


class roomScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            room: '',
            room_id: 0,
            modal_status: false,
            modal_edit_status: false,
            Token:''
        }
    }

    async componentDidMount(){
        await this.SessionTokenCheck()
        this.showRoom(this.state.Token)
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

    handleAddRoom = (name, Token) => {
        this.props.addRoom(name, Token)
        this.setState({modal_status: false})
    }

    handleEditRoom = (name, id, Token) => {
        this.props.editRoom(name, id, Token)
        this.setState({modal_edit_status: false})
    }

    showRoom = (Token) => {
        this.props.getRoom(Token)
        console.log(this.props.room, '>>>>....')
    }

    render(){
        return(
            <ScrollView>
            <View>
            <Header style={styles.header}>
                <Text style={styles.Title}>ROOMS</Text>
            </Header>
            <View style={styles.Container}>
                <View style={styles.content}>
                    <FlatList
                    data={[...this.props.room.room, {name: '+Add'}]}
                    numColumns={3}
                    renderItem={({item})=>{
                         if(item.name === '+Add'){
                            return(   
                              
                                <TouchableOpacity style={[styles.room, styles.roomAv, {backgroundColor: '#00d8d6'}]} onPress={()=>this.setState({modal_status:true, room: '', room_id:0})} >
                                    <Text style={[styles.label,{alignSelf:'center'}]}>
                                        {item.name} 
                                    </Text>
                                </TouchableOpacity>          
                            )
                         }else{
                            return(   
                              
                                <TouchableOpacity style={[styles.room, styles.roomAv]} onLongPress={()=>this.setState({modal_edit_status:true}, this.setState({room: item.name, room_id:item.id}))} >
                                    <Text style={[styles.label, {alignSelf:'center'}]}>
                                        {item.name} 
                                    </Text>
                                </TouchableOpacity>          
                            )
                         }
                        }}
                    />
                </View>
            </View>
            <Modal visible={this.state.modal_edit_status}>
                <View style={styles.Card}>
                <TouchableOpacity style={{backgroundColor:'red', borderRadius:100, width:35, height: 35}} onPress={()=>this.setState({modal_edit_status:false})}>
                            <Text style={[styles.labelButton,{textAlign:'center'}]}>X</Text>
                        </TouchableOpacity>
                    <Text style={[styles.labelButton, {textAlign:'center'}]}>Edit Room</Text>
                    <Text style={styles.label}>Name{this.state.room_id}</Text>
                    <Input style={styles.input} onChangeText={(room)=>{this.setState({room})}} value={this.state.room} />           
                    <View style={{justifyContent:'center'}}>
                        <TouchableOpacity style={[styles.Button,{alignSelf:'center'}]} onPress={()=>this.handleEditRoom(this.state.room, this.state.room_id, this.state.Token)}>
                            <Text style={[styles.labelButton,{textAlign:'center'}]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={this.state.modal_status}>
                <View style={styles.Card}>
                <TouchableOpacity style={{backgroundColor:'red', borderRadius:100, width:35, height: 35}} onPress={()=>this.setState({modal_status:false})}>
                            <Text style={[styles.labelButton,{textAlign:'center'}]}>X</Text>
                        </TouchableOpacity>
                    <Text style={[styles.label, {textAlign:'center'}]}>Add Room</Text>
                    <Text style={styles.label}>Name</Text>
                    <Input style={styles.input} onChangeText={(room)=>{this.setState({room})}} value={this.state.room} />           
                    <View style={{justifyContent:'center'}}>

                        <TouchableOpacity style={[styles.Button,{alignSelf:'center'}]} onPress={()=>this.handleAddRoom(this.state.room, this.state.Token)}>
                            <Text style={[styles.labelButton,{textAlign:'center'}]}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>                        
            </View>
            </ScrollView>

        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room
    }
}

const mapDispatchToProps = dispatch => ({
    getRoom: (Token) => dispatch(act.getRoom(Token)),
    addRoom: (name, Token) => dispatch(act.addRoom(name, Token)),
    editRoom: (name,id, Token) => dispatch(act.editRoom(name, id, Token))
})

export default connect(mapStateToProps, mapDispatchToProps)(roomScreen)