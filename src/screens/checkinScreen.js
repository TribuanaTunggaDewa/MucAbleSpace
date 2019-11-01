import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,Image,
    Picker
} from 'react-native'
import {Input, Header} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import * as act from '../_redux/_actions/checkin'
import * as cust from '../_redux/_actions/customer'
import moment from 'moment'
import CountDown from 'react-native-countdown-component'
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../source/style'


class checkinScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            modal_checkin_status: false,
            modal_checkout_status:false,
            modal_exist_status:false,
            room_id : 0,
            room_name: '',
            customer_id: 0,
            customer: '',
            identity_number:'',
            checkins:[],
            duration: 0,
            Token: '',
        }
    }

    async componentDidMount(){
        await this.SessionTokenCheck()
        this.showCustomer(this.state.Token)
        this.handleRooms(this.state.Token)
        this.state.checkins = this.props.checkin.checkin
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


    
    showCustomer(Token){
        this.props.getCustomer(Token)
    }

    handleRooms(Token){
        // axios.get(`${ip}/api/v2/checkin`)
        // .then(res=>{
        //     console.log(res.data)
        //     this.setState({rooms: res.data})
        // })
        this.props.getCheckin(Token)
    }

    handleAddcheckin= async(checkin, Token)=>{
        await this.props.addCheckin(checkin, Token)
        this.setState({modal_checkin_status:false})
    }

    handleCheckout = async(checkout, Token)=>{
        await this.props.Checkout(checkout, Token)
        this.setState({modal_checkout_status: false})
        this.setState({modal_checkin_status:false})

    }

    

    

    render(){
        return(
            <ScrollView>
            <View>
            <Header style={styles.header}>
                <Text style={styles.Title}>CHECKIN</Text>
            </Header>
            
            <View style={styles.Container}>
                <View style={styles.Content}>
                <FlatList
            data={this.props.checkin.checkin}
            numColumns={3}
            renderItem={({item})=>{

            if(item.customers.length > 0){
                    // if(item.customers[item.customers.length-1].orders.is_booked == 1){
                    //     return(  
                    //         <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center', backgroundColor:'gray'}} onLongPress={()=>{
                    //             this.setState({modal_checkout_status: true, room_id: item.id, room_name: item.name, customer_id: item.customers[item.customers.length-1].id,
                    //             customer : item.customers[item.customers.length-1].name, identity_number: item.customers[item.customers.length-1].identity_number})
                    //         }}>
                    //             <CountDown
                    //                 until={10}
                    //                 onFinish={() => alert('finished')}
                    //                 size={20}
                    //                 style={{width:20, height:20}}
                    //             />
                                
                    //         </TouchableOpacity>
   
                    // )
                    // }else{
                    //     return(  
                    //         <TouchableOpacity style={{margin:10, borderWidth: 2, width: 100, height: 100, justifyContent:'center', backgroundColor:'green'}} onLongPress={()=>{
                    //             this.setState({modal_checkin_status: true, room_id: item.id, room_name: item.name, customers: this.props.customer.customer})}}>
                    //             <Text style={{textAlign:'center'}}>
                    //                 {item.name}
                    //             </Text>
                    //         </TouchableOpacity>
   
                    // )

                    // }
                    if(item.customers.some(cust => cust.orders.is_done === false && cust.orders.is_booked === true)){
                        return(  
                            <TouchableOpacity style={[styles.room, styles.roomDiv]} onLongPress={()=>{
                                this.setState({modal_checkout_status: true, room_id: item.id, room_name: item.name, customer_id: item.customers[item.customers.length-1].id,
                                customer : item.customers[item.customers.length-1].name, identity_number: item.customers[item.customers.length-1].identity_number,    
                            })
                            }}>
                                <CountDown
                                    until={this.state.duration * 60}
                                    timeToShow= {['M','S']}
                                    onFinish={() => {
                                        const checkout = {
                                            customer_id: this.state.customer_id,
                                            room_id: item.id,
                                            is_done: true,
                                            is_booked: false,
                                            duration: this.state.duration,
                                            order_end_time: moment().format()      
                                           
                                        }
                                        this.handleCheckout(checkout, this.state.Token)
                                    }}
                                    size={20}
                                   
                                />  
                            </TouchableOpacity>
                            
   
                    )
                    }else{
                        return(  
                            <TouchableOpacity style={[styles.room, styles.roomAv]} onLongPress={()=>{
                                this.setState({modal_checkin_status: true, room_id: item.id, room_name: item.name, customers: this.props.customer.customer, checkins:item})}}>
                                <Text style={[styles.label,{alignSelf:'center'}]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
   
                    )

                    }
                }else{
                    return(  
                        <TouchableOpacity style={[styles.room,styles.roomAv]} onLongPress={()=>{
                            this.setState({modal_checkin_status: true, room_id: item.id, room_name:item.name, customers: this.props.customer.customer, checkins:item}
                            )}}>
                            <Text style={[styles.label,{alignSelf:'center'}]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                )

                }
            }}
        />

       
                    <Modal visible={this.state.modal_checkin_status}>
                        <View style={[styles.content,{bottom: 50}]}>
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
                                 <Picker.Item label='Pilih Customer' value={0} style={{borderWidth:2}}  />
                            {this.props.customer.customer.map((val,index)=>{
                                return(
                                    <Picker.Item label={val.identity_number+'  '+val.name} value={val.id} key={index} style={{borderWidth:2}}  />
                                )
                            })}
                            </Picker>
                            <Text>Duration (minutes)</Text>
                            <Input style={styles.Input} onChangeText={(duration)=>{this.setState({duration})}} value={this.state.duration} />
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
                                        order_end_time: moment().format()}
                                    let test = {...checkin, is_done: true, is_booked: false}
                                    if(this.state.checkins.customers.some(cust => cust.orders.customer_id == checkin.customer_id && cust.orders.room_id == checkin.room_id)){
                                        this.handleCheckout(checkin, this.state.Token)
                                    }else{
                                        this.handleAddcheckin(checkin, this.state.Token)
                                    }
                                    
                                   
                                    
                                    
                                }}>
                                    <Text style={{textAlign:'center'}}>Checkin</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Modal>

                        <Modal visible={this.state.modal_checkout_status}>
                        <View style={[styles.content,{bottom: 50}]}>
                            <Text style={{textAlign:'center'}}>Checkout</Text>
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
                                    this.handleCheckout(checkout, this.state.Token)
                                    
                                  
                                    
                                }}>
                                    <Text style={{textAlign:'center'}}>Checkout</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Modal>
                        
                </View>
            </View>
                
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
    getCheckin: (Token)=> dispatch(act.getCheckin(Token)),
    getCustomer: (Token)=> dispatch(cust.getCustomer(Token)),
    addCheckin: (checkin, Token)=> dispatch(act.addCheckin(checkin, Token)),
    Checkout: (checkout, Token)=> dispatch(act.Checkout(checkout, Token))
})

export default connect(mapStateToProps, mapDispatchToProps)(checkinScreen)