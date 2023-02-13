import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {  Button, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
const AddChat = ({navigation}) => {
const [input,setInput]=useState('')
const navigations=useNavigation()
useLayoutEffect(()=>{
navigation.setOptions({
title:'Add New Chat',
headerBackTitle:'Chats',
})
  },[navigation])
const db=getFirestore()
const colRef=collection(db,'chats')
const createChat=async()=>{
await addDoc(colRef,{
  chatName:input,
}).then(()=>{
  navigations.goBack()
}).catch(err=>alert(err))
}
  return (
    <View>
      <Input placeholder='Enter a Chat Name ' value={input} 
      onChangeText={(txt)=>setInput(txt)} 
      leftIcon={
        <Icon name='wechat' type='antdesign' size={24} color='black' />
      }
      onSubmitEditing={createChat}/>
      <Button title='Create New Chat ' onPress={createChat}/>
    </View>
  )
}

export default AddChat