import {StyleSheet} from 'react-native'

const FontColor = '#2c3e50'
const CardColor = '#ecf0f1'
const TitleSize = 36
const labelSize = 18
const borderColor = '#2ecc71'
const buttonColor = '#00d8d6'

export default StyleSheet.create({
  
    Container: {
        backgroundColor:'#9fdfcd',
        alignItems:'center',
    },
    Content:{
        width:350,
    
    },
    subContent:{
        alignItems:'center'
    },
    Card:{
        marginTop: 30,
        width:300,
        height:284,
        padding: 30,
        backgroundColor: CardColor,
        opacity:0.7,
        borderRadius: 20,
        marginBottom: 80
    },
    CardImage:{
        marginTop: 25,
        width:350,
        height:150,
        padding: 30,
        backgroundColor: CardColor,
        borderRadius: 20,
        flexDirection: 'row'
    },
    Title:{
        fontSize: TitleSize,
        color: FontColor
    },
    label:{
        fontSize: labelSize,
        color: FontColor,
        marginTop:10
    },
    labelButton:{
        fontSize: labelSize,
        color: FontColor,
        marginTop: 5
    },
    input:{
        borderWidth: 1,
        borderColor: borderColor,
        marginTop: 10
    },
    Button:{
        width: 100,
        height: 35,
        backgroundColor: buttonColor,
        marginTop: 20,
        borderRadius: 30

    },
    header : {
        backgroundColor: '#2ecc71'
    },
    room:{
        margin:10,
        width: 100,
        height: 100,
        justifyContent:'center',
        borderRadius: 20,
        elevation: 2
    },
    roomAv:{
        backgroundColor: 'white'
    },
    roomDiv:{
        backgroundColor:'black'
    }
    

})