import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from 'react-native-elements'
import {createUserWithEmailAndPassword,getAuth, updateProfile} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../Firebqse'


const Register = ({navigation}) => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[image,setImage]=useState()
    const navigations=useNavigation()
    const register=async()=>{
const {user}=await createUserWithEmailAndPassword(auth,email,password)
try{
await updateProfile(user,{
    displayName:name,
    photoURL:image || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    
})
}catch(err){
console.log(err)
}


navigations.navigate("Home")
    }
    useLayoutEffect(()=>{
navigation.setOptions({
    headerBackTitle:"Back To Login",

})
    },[navigation])
return (
    <KeyboardAvoidingView  className="items-center justify-center flex-1">
        <StatusBar style='light'/>
    <View style={styles.container}>    
    <Text style={styles.title} className='text-lg font-medium justify-center items-center p-4'>Create a YourDay account:</Text>
    <View style={styles.input}>
    <Input autoFocus   value={name} type='text' onChangeText={(text)=>setName(text)} placeholder='Full Name'/>
        <Input  value={email} onChangeText={(text)=>setEmail(text)} placeholder='Email'/>
        <Input  value={password} secureTextEntry onChangeText={(text)=>setPassword(text)} placeholder='Password'/>
        <Input  value={image} onSubmitEditing={register} onChangeText={(text)=>setImage(text)} placeholder='Profile Picture URL (optional)'/>    
    </View>
        
    </View>
    <View className='justify-center items-center '>
    <Button raised title='Register' containerStyle={styles.button} onPress={register}/>    
    </View>
    
    </KeyboardAvoidingView>
)
}

export default Register
const styles=StyleSheet.create({
    input:{
    width:300,
    },
    title:{
        fontSize:26
    },
    container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    },
    button:{
    width:200,
    marginTop:5,
    justifyContent:'center',


    },
})
//12:08