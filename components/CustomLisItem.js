import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'

const CustomLisItem = ({chatName,enterChat,id}) => {
    const [lastM,setLastM]=useState('')
    const db=getFirestore()
    const colRef=collection(db,'chats',id,'messages')
    useEffect(()=>{
        const last=query(colRef,orderBy('timestamp','desc'))
        onSnapshot(last,(data)=>{
            setLastM(
                data.docs.map((item)=>{
                    return item.data()
                })
            )
        })
    })

return (
    <ListItem onPress={()=>enterChat(id,chatName)} key={id}>
    <Avatar rounded source={{uri:lastM[0]?.photoURL || 'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar'}}/> 
    
    <ListItem.Content>
        <ListItem.Title className='text-lg font-bold'>{chatName}</ListItem.Title>
    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
        {lastM[0]?.message}
    </ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
)
}

export default CustomLisItem