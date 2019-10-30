import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,Image,
    Picker
} from 'react-native'
import styles from '../styles'
import {Input} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'

import {connect} from 'react-redux'
import * as act from '../_redux/_actions/checkin'
import * as cust from '../_redux/_actions/customer'
import moment from 'moment'
import CountdownCircle from'react-native-countdown-circle'

class checkinScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            modal_checkin_status: false,
            modal_checkout_status:false,
            room_id : 0,
            room_name: '',
            customer_id: 0,
            customer: '',
            identity_number:'',
            customers: [],
            duration: 0
        }
    }

    componentDidMount(){
        this.showCustomer()
        this.handleRooms()
        
    }

    
    showCustomer(){
        this.props.getCustomer()
    }

    handleRooms(){
        // axios.get(`${ip}/api/v2/checkin`)
        // .then(res=>{
        //     console.log(res.data)
        //     this.setState({rooms: res.data})
        // })
        this.props.getCheckin()
    }

    handleAddcheckin= async(checkin)=>{
        await this.props.addCheckin(checkin)
        this.setState({modal_checkin_status:false})
    }

    handleCheckout = async(checkout)=>{
        await this.props.Checkout(checkout)
        this.setState({modal_checkout_status: false})

    }

    

    

    render(){
        return(
            <ScrollView>
            <View>
            <FlatList
            data={this.props.checkin.checkin}
            numColumns={3}
            renderItem={({item})=>{

            if(item.customers.length){
                    if(item.customers[item.customers.length-1].orders.is_booked == 1){
                        return(  
                            <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center', backgroundColor:'gray'}} onLongPress={()=>{
                                this.setState({modal_checkout_status: true, room_id: item.id, room_name: item.name, customer_id: item.customers[item.customers.length-1].id,
                                customer : item.customers[item.customers.length-1].name, identity_number: item.customers[item.customers.length-1].identity_number})
                            }}>
                                 <Text style={{textAlign:'center'}}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
   
                    )
                    }else{
                        return(  
                            <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center', backgroundColor:'green'}} onLongPress={()=>{
                                this.setState({modal_checkin_status: true, room_id: item.id, room_name: item.name, customers: this.props.customer.customer})}}>
                                <Text style={{textAlign:'center'}}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
   
                    )

                    }
                }else{
                    return(  
                        <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center', backgroundColor:'green'}} onLongPress={()=>{
                            this.setState({modal_checkin_status: true, room_id: item.id, room_name:item.name, customers: this.props.customer.customer}
                            )}}>
                            <Text style={{textAlign:'center'}}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                )

                }
            }}
        />

       
                    <Modal visible={this.state.modal_checkin_status}>
                        <View style={{margin:10, height: 250, borderWidth:2, backgroundColor:'white', top:-20}}>
                            <Text style={{textAlign:'center'}}>Add Checkin</Text>
                            <Text>Room Name</Text>
                            <Input  style={{borderWidth:2, height:20, backgroundColor:'gray'}} value={this.state.room_name} disabled />          
                            <Text>Customer</Text>
                            <Picker
                                mode='dropdown'
                                style={{height:30}}
                                selectedValue={(this.state.customer_id)}
                                onValueChange={(value)=>{
                                    this.setState({customer_id:value})
                                }}
                          
                            >
                            {this.state.customers.map((val,index)=>{
                                return(
                                    <Picker.Item label={val.identity_number+'  '+val.name} value={val.id} key={index} style={{borderWidth:2}}  />
                                )
                            })}
                            </Picker>
                            <Text>Duration (minutes)</Text>
                            <Input style={{borderWidth:2,  height:20}} onChangeText={(duration)=>{this.setState({duration})}} value={this.state.duration} />
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_checkin_status:false})}>
                                    <Text style={{textAlign:'center'}}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>{
                                    const checkin = {
                                        customer_id: this.state.customer_id,
                                        room_id: this.state.room_id,
                                        is_done: false,
                                        is_booked: true,
                                        duration: this.state.duration,
                                        order_end_time: moment().format()                                   }
                                    this.handleAddcheckin(checkin)
                                }}>
                                    <Text style={{textAlign:'center'}}>Checkin</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Modal>

                        <Modal visible={this.state.modal_checkout_status}>
                        <View style={{margin:10, height: 250, borderWidth:2, backgroundColor:'white', top:-20}}>
                            <Text style={{textAlign:'center'}}>Add Checkin</Text>
                            <Text>Room Name</Text>
                            <Input  style={{borderWidth:2, height:20, backgroundColor:'gray'}} value={this.state.room_name} disabled />          
                            <Text>Customer</Text>
                            <Picker
                                style={{height:30}}
                                selectedValue={(this.state.customer_id)}
                                disabled                                                   
                            >
                            <Picker.Item label={this.state.identity_number+'  '+this.state.customer} value={this.state.customer_id}  style={{borderWidth:2}}  /> 
                            </Picker>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_checkout_status                                                                                                                                                                                                                                                                                                                                  :false})}>
                                    <Text style={{textAlign:'center'}}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>{
                                    const checkout = {
                                        customer_id: this.state.customer_id,
                                        room_id: this.state.room_id,
                                        is_done: true,
                                        is_booked: false,
                                        duration: this.state.duration,
                                        order_end_time: moment().format()      
                                    
                                    }
                                    this.handleCheckout(checkout)
                                    
                                }}>
                                    <Text style={{textAlign:'center'}}>Checkout</Text>
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
    return{
        checkin: state.checkin,
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => ({
    getCheckin: ()=> dispatch(act.getCheckin()),
    getCustomer: ()=> dispatch(cust.getCustomer()),
    addCheckin: (checkin)=> dispatch(act.addCheckin(checkin)),
    Checkout: (checkout)=> dispatch(act.Checkout(checkout))
})

export default connect(mapStateToProps, mapDispatchToProps)(checkinScreen)