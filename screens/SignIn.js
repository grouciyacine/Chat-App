import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {Button,Image,Input}from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import {signInWithEmailAndPassword,getAuth,onAuthStateChanged} from 'firebase/auth'
import { auth } from '../Firebqse'

export default function SignIn({navigation}) {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigations=useNavigation()
   // const auth=getAuth()

/*  useEffect(()=>{
const unsecribe=onAuthStateChanged(auth,authuser=>{
    console.log(authuser)
if(authuser){
    navigations.navigate('Home')
}
})
return unsecribe;
    },[])*/
    const sign=()=>{
signInWithEmailAndPassword(auth,email,password)
.then(navigations.navigate('Home'))
.catch((err)=>console.log(err))

    }
return (
    <KeyboardAvoidingView behavior='padding' enabled className='justify-center items-center flex-1 '>
    <StatusBar style='light'/>
    <View className='justify-center flex-row  pt-20'>
    <Image className="w-40 h-40  " source={require("../si..png")}/>    
    </View>
    
    <Input value={email} className='w-4' autoFocus onChangeText={(e)=>setEmail(e)} type='Email' placeholder='Email' containerStyle={styles.input}/>
    <Input value={password} onChangeText={(text)=>setPassword(text)} type='Password'secureTextEntry placeholder='Enter PassWord' containerStyle={styles.input}/>
    <Button  title='Sign Up' onPress={sign} containerStyle={styles.button}/>
    <Button onPress={()=>navigations.navigate('Register')} title='Register' type='outline' containerStyle={styles.button} /> 
    
    </KeyboardAvoidingView>
    )
}
const styles=StyleSheet.create({
    button:{
    width:200,
    marginTop:10
    },
    input:{
    width:300,
    }
})
