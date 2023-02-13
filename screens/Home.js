import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { auth } from '../Firebqse'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import CustomLisItem from '../components/CustomLisItem'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { collection, Firestore, getFirestore, onSnapshot } from 'firebase/firestore'
const Home = ({navigation}) => {
    const [chats,setChats] =useState([])
    const navigations=useNavigation()
    const logout=()=>{
    auth.signOut().then(navigations.navigate("signIn")).catch((err)=>console.log(err))
}
const db=getFirestore()
const colRef=collection(db,'chats')
useEffect(()=>{
onSnapshot(colRef,(data)=>{
    setChats(
        data.docs.map((items)=>{
            return {...items.data(),id:items.id}
        })
    )
})
},[])    
useLayoutEffect(()=>{
    navigation.setOptions({
    headerRight:()=>(
        <View style={{marginRight:20, flexDirection:'row' }}>
        <TouchableOpacity style={{paddingRight:10}}   activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigations.navigate('AddChat')}} style={{paddingRight:10}}  activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}  activeOpacity={0.5}>
            <SimpleLineIcons name='logout' size={24} color='black' />
        </TouchableOpacity>
    </View>
    )
    })    
    },[navigation])
    const enterChat=(id,chatname)=>{
navigations.navigate('Chat',{
    id,
    chatname,
})
    }
return (
<SafeAreaView>
    <ScrollView>
        {chats.map(chat=>(
        <CustomLisItem  key={chat.id} id={chat.id} enterChat={enterChat} chatName={chat.chatName} />    
        ))}

    </ScrollView>


</SafeAreaView>
)
}

export default Home
//13:8