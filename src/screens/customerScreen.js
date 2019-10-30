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
import {Input} from 'native-base'
import axios from 'axios'
import {ip} from '../source/domain'
import Modal from 'react-native-modal'
import {connect} from 'react-redux'
import * as act from '../_redux/_actions/customer'


class customerScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer: '',
            customer_id: 0,
            id_card: '',
            phone: '',
            modal_status: false,
            modal_edit_status: false
        }
    }

    componentDidMount(){
        this.showCustomer()
    }

    // handleCustomer(){
    //     axios.get(`${ip}/api/v2/customers`)
    //     .then(res=>{
    //         console.log(res.data)
    //         this.setState({customers: res.data})
    //     })
    // }

    handleAddCustomer = (customer)=>{
        // axios.post(`${ip}/api/v2/customer`, {
        //     name: this.state.customer,
        //     identity_number: this.state.id_card,
        //     phone_number: this.state.phone
        // }).then(()=>{
        //     alert('Added Success')
        //     this.handleCustomer()
        //     this.setState({modal_status:false})
        // })
        this.props.addCustomer(customer)
        this.state.modal_status=false
    }

    handleEditCustomer = (customer, id)=>{
        this.props.editCustomer(customer, id)

    }

    showCustomer=()=>{
        this.props.getCustomer()
        console.log(this.props.customer.customer, '======')
    }

    render(){
        return(
              <ScrollView>
                <View>
                <FlatList
                    data={this.props.customer.customer}
                    renderItem={({item})=>{
                        return(
                                <TouchableOpacity style={{margin:10, borderWidth: 2, width: 340, height: 100, justifyContent:'flex-start', flexDirection:'row'}} onLongPress={()=>{
                                    this.setState({modal_edit_status: true,
                                                   customer_id: item.id,
                                                   customer: item.name,
                                                   id_card: item.identity_number,
                                                   phone: item.phone_number})
                                    

                                }}>
                                    <Image style={{left:0, top: 10, borderWidth: 2, width: 70, height: 70, justifyContent:'center', borderRadius:100}} source={{uri: item.image}} />
               
                                    <View style={{ justifyContent:'center'}}>
                                        <Text>
                                            {item.identity_number}
                                        </Text>
                                        <Text style={{justifyContent:'space-around'}}>
                                            {item.name}
                                        </Text>
                                        <Text style={{justifyContent:'space-around'}}>
                                            {item.phone_number}
                                        </Text>
                                    </View>
                                </TouchableOpacity>                 
                        )
                    }}
                />
                <View style={{justifyContent:'center'}}>
                <TouchableOpacity style={{width:100, height: 25, borderWidth:2, alignSelf:'center'}} onPress={()=>this.setState({modal_status:true})}>
                    <Text style={{textAlign:'center'}}>Add</Text>
                </TouchableOpacity>
                </View>

                <Modal visible={this.state.modal_edit_status}>
                <View style={{margin:10, height: 250, borderWidth:2, backgroundColor:'white', top:-20}}>
                    <Text style={{textAlign:'center'}}>Edit Customer</Text>
                    <Text>Name</Text>
                    <Input  style={{borderWidth:2, height:20}} onChangeText={(customer)=>{this.setState({customer})}} value={this.state.customer} />           
                    <Text>Identity Number</Text>
                    <Input  style={{borderWidth:2, height:20}} onChangeText={(id_card)=>{this.setState({id_card})}} value={this.state.id_card} />
                    <Text>Phone Number</Text>
                    <Input style={{borderWidth:2,  height:20}} onChangeText={(phone)=>{this.setState({phone})}} value={this.state.phone} />
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
                            this.handleEditCustomer(customer, this.state.customer_id)
                            this.setState({modal_edit_status: false})
                            }}>
                            <Text style={{textAlign:'center'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

                <Modal visible={this.state.modal_status}>
                <View style={{margin:10, height: 250, borderWidth:2, backgroundColor:'white', top:-20}}>
                    <Text style={{textAlign:'center'}}>Add Customer</Text>
                    <Text>Name</Text>
                    <Input  style={{borderWidth:2, height:20}} onChangeText={(customer)=>{this.setState({customer})}} value={this.state.customer} />           
                    <Text>Identity Number</Text>
                    <Input  style={{borderWidth:2, height:20}} onChangeText={(id_card)=>{this.setState({id_card})}} value={this.state.id_card} />
                    <Text>Phone Number</Text>
                    <Input style={{borderWidth:2, height:20}} onChangeText={(phone)=>{this.setState({phone})}} value={this.state.phone} />
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
                            this.handleAddCustomer(customer)}}>
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
    getCustomer: () => dispatch(act.getCustomer()),
    addCustomer: (customer) => dispatch(act.addCustomer(customer)),
    editCustomer: (customer, id) => dispatch(act.editCustomer(customer, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(customerScreen)
