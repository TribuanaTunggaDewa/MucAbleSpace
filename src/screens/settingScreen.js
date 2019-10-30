import React, {Component} from 'react'
import {
    styleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

class settingScreen extends Component {

    render(){
        return(
            <View>
            <View style={{flexDirection:'row'}}>
                <View style={{margin:10, width: 340, height: 100, justifyContent:'center', flexDirection:'row'}}>
                <View style={{ left:-30, top: 10, borderWidth: 2, width: 70, height: 70, justifyContent:'center', borderRadius:100}}>
                    <Text style={{textAlign:'center'}}>
                        Bagian Avatar
                    </Text>
                    </View>
                    <View style={{ justifyContent:'center'}}>
                    <Text>
                        Bagian Informasi
                    </Text>
                    </View>
                </View>                 
            </View>
        </View>
        )
    }
}

export default settingScreen