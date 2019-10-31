import {StyleSheet} from 'react-native'

const color = '#009688'
const buttonColor = '#03A9F4'

export default StyleSheet.create({
    
    input: {
        width: 100
    },
    container:{
        padding: 10,
        alignItems: 'center'
    },
    content:{
        margin: 10,
        padding: 10,
        backgroundColor : '#BDBDBD',
        height: 265,
        bottom: -150,
        width: 300,
        alignSelf:'center',
        borderRadius: 5
    },
    imagelist:{
        margin:10, 
        borderWidth: 1,
        width: 340,
        height: 100, 
        justifyContent:'flex-start', 
        flexDirection:'row',
        backgroundColor: '#BDBDBD',
        borderRadius: 5
        
    },
    label:{
        fontSize: 19,
        color: '#212121'
    },
    text:{
        fontSize: 16,
        color: '#212121',
        marginStart:20
    },
    Input:{
        backgroundColor: 'white',
        marginTop: 12
    },
    loginTitle:{
        fontSize: 28,
        fontStyle: 'normal',
        textAlign:'center',
        marginTop: 40
    
    },
    loginSubtitle:{
        textAlign:'center'
    },
    loginCard:{
        marginTop: 30,
        backgroundColor:'white',
        width: 270,
        alignSelf:'center'
    },
    oneButton:{
        backgroundColor: buttonColor,
        width: 235,
        height:45,
        alignSelf: 'center',
        margin: 20
    },
    oneButtonDanger:{
        backgroundColor: '#F44336',
        width: 270,
        height:50,
        alignSelf: 'center'
    },
    splitButtonDanger:{
        backgroundColor: '#F44336',
        height: 50,
        marginStart: 11,
        textAlignVertical: 'center'
    },
    TextButton:{
        fontSize:18,
        textAlign:'center',
        justifyContent:'center',
        paddingTop: 10,
        color:'white'

},header:{
    backgroundColor: color
},secondHeader:{
    backgroundColor: '#00796B'
},


buttoncolor :{
    backgroundColor: buttonColor
},imageBanner:{
        width :400,
        height:170
    },
      splitButton:{
        backgroundColor: buttonColor,
        marginStart: 11,

    },
    textList:{
        marginStart: 30
    },
    circleBorder : {
        height:200,
        width:200, 
        borderRadius: 200/ 2,
        borderWidth:4,
        borderColor: 'black',
        alignSelf:'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 10,
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    }
   

})