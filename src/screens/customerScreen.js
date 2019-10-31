import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    
} from 'react-native'
import {Input,Header} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import Modal from 'react-native-modal'
import {connect} from 'react-redux'
import * as act from '../_redux/_actions/customer'
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../source/style'

class customerScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer: '',
            customer_id: 0,
            id_card: '',
            phone: '',
            modal_status: false,
            modal_edit_status: false,
            Token: ''
        }
    }

    async componentDidMount(){
        await this.SessionTokenCheck()
        this.showCustomer(this.state.Token)
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

    // handleCustomer(){
    //     axios.get(`${ip}/api/v2/customers`)
    //     .then(res=>{
    //         console.log(res.data)
    //         this.setState({customers: res.data})
    //     })
    // }

    handleAddCustomer = (customer, Token)=>{
        // axios.post(`${ip}/api/v2/customer`, {
        //     name: this.state.customer,
        //     identity_number: this.state.id_card,
        //     phone_number: this.state.phone
        // }).then(()=>{
        //     alert('Added Success')
        //     this.handleCustomer()
        //     this.setState({modal_status:false})
        // })
        this.props.addCustomer(customer, Token)
        this.state.modal_status=false
    }

    handleEditCustomer = (customer, id, Token)=>{
        this.props.editCustomer(customer, id, Token)

    }

    showCustomer=(Token)=>{
        this.props.getCustomer(Token)
        console.log(this.props.customer.customer, '======')
    }

    render(){
        return(
              <ScrollView>
                <View>
                <Header style={{backgroundColor:'#757575'}}>
                <Text style={styles.TextButton}>CUSTOMERS</Text>
                </Header>
                <FlatList
                    data={this.props.customer.customer}
                    renderItem={({item})=>{
                        return(
                                <TouchableOpacity style={styles.imagelist} onLongPress={()=>{
                                    this.setState({modal_edit_status: true,
                                                   customer_id: item.id,
                                                   customer: item.name,
                                                   id_card: item.identity_number,
                                                   phone: item.phone_number})
                                    

                                }}>
                                    <Image style={{left:0, top: 10, borderWidth: 2, width: 70, height: 70, justifyContent:'center', borderRadius:100}} source={{uri: item.image}} />
               
                                    <View style={{ justifyContent:'center'}}>
                                        <Text style={styles.text}>
                                            {item.identity_number}
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.phone_number}
                                        </Text>
                                    </View>
                                </TouchableOpacity>                 
                        )
                    }}
                />
                <View style={{justifyContent:'center'}}>
                <TouchableOpacity style={styles.oneButton} onPress={()=>this.setState({modal_status:true})}>
                    <Text style={styles.TextButton}>Add</Text>
                </TouchableOpacity>
                </View>

                <Modal visible={this.state.modal_edit_status}>
                <View style={[styles.content,{bottom: 50, height: 280}]}>
                    <Text style={{textAlign:'center'}}>Edit Customer</Text>
                    <Text>Name</Text>
                    <Input  style={styles.Input} onChangeText={(customer)=>{this.setState({customer})}} value={this.state.customer} />           
                    <Text>Identity Number</Text>
                    <Input  style={styles.Input} onChangeText={(id_card)=>{this.setState({id_card})}} value={this.state.id_card} />
                    <Text>Phone Number</Text>
                    <Input style={styles.Input} onChangeText={(phone)=>{this.setState({phone})}} value={this.state.phone} />
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_edit_status:false})}>
                            <Text style={{textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>{
                            const customer = {
                                name: this.state.customer,
                                identity_number: this.state.id_card,
                                phone_number: this.state.phone,
                            }
                            this.handleEditCustomer(customer, this.state.customer_id, this.state.Token)
                            this.setState({modal_edit_status: false})
                            }}>
                            <Text style={{textAlign:'center'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

                <Modal visible={this.state.modal_status}>
                <View style={[styles.content,{bottom: 50, height: 280}]}>
                    <Text style={{textAlign:'center'}}>Add Customer</Text>
                    <Text>Name</Text>
                    <Input   style={styles.Input} onChangeText={(customer)=>{this.setState({customer})}} value={this.state.customer} />           
                    <Text>Identity Number</Text>
                    <Input   style={styles.Input} onChangeText={(id_card)=>{this.setState({id_card})}} value={this.state.id_card} />
                    <Text>Phone Number</Text>
                    <Input  style={styles.Input} onChangeText={(phone)=>{this.setState({phone})}} value={this.state.phone} />
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_status:false})}>
                            <Text style={{textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>{
                            const customer = {
                                name: this.state.customer,
                                identity_number: this.state.id_card,
                                phone_number: this.state.phone
                            }
                            this.handleAddCustomer(customer, this.state.Token)}}>
                            <Text style={{textAlign:'center'}}>Add</Text>
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
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => ({
    getCustomer: (Token) => dispatch(act.getCustomer(Token)),
    addCustomer: (customer, Token) => dispatch(act.addCustomer(customer, Token)),
    editCustomer: (customer, id, Token) => dispatch(act.editCustomer(customer, id, Token))
})

export default connect(mapStateToProps, mapDispatchToProps)(customerScreen)
