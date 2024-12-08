const { StyleSheet } = require("react-native");

exports.styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    loginContainer:{
        display:'flex',
        flexBasis:'column',
        gap:5,
        width:'80%',
        marginTop:'10%',
        margin:'auto',
    },
    buttonLogin:{
        padding:5,
        borderRadius:50,
        fontSize:30
    },
    loginInput:{
        width:'100%',
        borderWidth:1,
        padding:10,
        marginBottom:10,
        borderRadius:25,
    },
    logoWrapper:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        marginTop:50
    },
    logo:{
        width:200,
        height:200,
        borderRadius:100,
        marginBottom:30
    },
    title:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    registerMessage:{
        textAlign:'center',
        margin:20
    },
    secureEntry:{
        flex:0,
        flexDirection:'row',
        gap:5,
        justifyContent:'space-between',
        alignItems:'center',
    }
  });