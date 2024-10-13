const { StyleSheet } = require("react-native");

const profileStyles = StyleSheet.create({

    mainContainer:{
        width:'100%',
        height:'100%',
        flex:1,
        padding:20,
        gap:10,
    },
    topContainer:{
        height:'auto',
        width:'100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 0.02,
        elevation: 3,
        gap:5,
        padding:20,
    },
    resultContainer:{
        height:'auto',
        width:'100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 0.02,
        elevation: 3,
        gap:5,
        padding:20,
        backgroundColor:'#FAFFAF'
    },
    bmiWeightCard:{
        backgroundColor: 'white',
        flex:0,
        width:'100%',
        height:'auto',
        padding:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 0.02,
        elevation: 3,
        gap:5,
        padding:20
    },
    bmiWeightCardInner:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%'
    },
   bmiStat:{
    fontSize:80,
    fontWeight:'bold',
   },
   bmiStatResult:{
    fontSize:30,
    fontWeight:'bold',
   },
   weightStat:{
        fontSize:30,
   },
//    bmiButtonAdd:{
//     width:100,
//     height:100
//    }
  });

  export default profileStyles