import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Modal from 'react-native-modal'
import {Input} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import { ScrollView } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import * as act from '../_redux/_actions/room'


class roomScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            room: '',
            room_id: 0,
            modal_status: false,
            modal_edit_status: false
        }
    }

    componentDidMount(){
        this.showRoom()
    }

    handleAddRoom = (name) => {
        this.props.addRoom(name)
        this.setState({modal_status: false})
    }

    handleEditRoom = (name, id) => {
        this.props.editRoom(name, id)
        this.setState({modal_edit_status: false})
    }

    showRoom = () => {
        this.props.getRoom()
        console.log(this.props.room, '>>>>....')
    }

    render(){
        return(
            <View>
            <ScrollView>
            <View style={{flexDirection:'column'}}> 
            <FlatList
            data={this.props.room.room}
            numColumns={3}
            renderItem={({item})=>{
                return(   
                        <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center'}} onLongPress={()=>this.setState({modal_edit_status:true}, this.setState({room: item.name, room_id:item.id}))} >
                            <Text style={{textAlign:'center'}}>
                                {item.name} 
                            </Text>
                        </TouchableOpacity>          
                    )
                }}
            />
              
       
                        <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center'}} onPress={()=>this.setState({modal_status:true})} >
                            <Text style={{textAlign:'center'}}>
                                Add++
                            </Text>
                        </TouchableOpacity>
            </View>                 
        
            </ScrollView>
                       
            <Modal visible={this.state.modal_edit_status}>
                <View style={{height: 120, borderWidth:2, backgroundColor:'white', top:-20}}>
                    <Text style={{textAlign:'center'}}>Edit Room</Text>
                    <Text>Name{this.state.room_id}</Text>
                    <Input  style={{borderWidth:2}} onChangeText={(room)=>{this.setState({room})}} value={this.state.room} />           
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_edit_status:false})}>
                            <Text style={{textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.handleEditRoom(this.state.room, this.state.room_id)}>
                            <Text style={{textAlign:'center'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={this.state.modal_status}>
                <View style={{height: 120, borderWidth:2, backgroundColor:'white', top:-20}}>
                    <Text style={{textAlign:'center'}}>Add Room</Text>
                    <Text>Name</Text>
                    <Input  style={{borderWidth:2}} onChangeText={(room)=>{this.setState({room})}} value={this.state.room} />           
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_status:false})}>
                        <Text style={{textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.handleAddRoom(this.state.room)}>
                            <Text style={{textAlign:'center'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            </View>
        

        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room
    }
}

const mapDispatchToProps = dispatch => ({
    getRoom: () => dispatch(act.getRoom()),
    addRoom: (name) => dispatch(act.addRoom(name)),
    editRoom: (name,id) => dispatch(act.editRoom(name,id))
})

export default connect(mapStateToProps, mapDispatchToProps)(roomScreen)