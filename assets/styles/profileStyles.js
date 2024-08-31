const { StyleSheet } = require("react-native");

const profileStyles = StyleSheet.create({

    mainContainer:{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        marginTop:10,
        padding:30
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
        padding:20
    },
    profilePicture:{
        marginTop:30
    },
    profileItems:{
        flex:0,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        width:'auto',
        height:50,
        paddingLeft:20,
        paddingRight:20,
        shadowOpacity: 0.05,
        shadowRadius: 0.02,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        borderRadius: 10,
        shadowColor: '#000',
    },
    profileName:{
        fontSize:20,
        fontWeight:'bold'
    },
    profileDetailsTop:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        height:70,
        width:'100%'
    },
    genderSection:{
        flex:0,
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
        gap:10,
    },
    profileSection:{
        width:'100%',
        backgroundColor: 'white',
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 0.02,
        elevation: 3,
        gap:20,
        padding:20,

    },
    profileSectionInfo:{
        flex:0,
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'100%'
    },
    sectionTitle:{
        fontSize:20,
        textAlign:'left',
        width:'100%',
        fontWeight:'bold',
        marginTop:20,
        marginBottom:10

    },
    profileSectionInfoLabel:{
        fontWeight:'bold'
    },
    textInput:{
        width:'100%',
        borderColor: 'gray', borderWidth: 1, padding: 5 
    },
    buttonSave:{
        margin:20
    },
    editButtonsView:{
        flex:1,
        flexDirection:'row',
        gap:0
    }
  });

  export default profileStyles