import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { collection, getFirestore,addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, storage2} from '../Firebqse'
import * as ImagePicker from 'expo-image-picker'
//import {getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import storage from '@react-native-firebase/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const ChatScreen = ({navigation}) => {
    const navigate=useNavigation()
    const{params:{id,chatname}}=useRoute()
    const [text,setText]=useState('')
    const [ourData,setOurData]=useState([])
    const [image,setImage]=useState(null)
    const[uploading,setUploading]=useState(false)
    const pickImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });
        
        //console.log(result.assets[0])
        if(!result.canceled){
            setImage(result.uri? [result.uri]:result.selected);   
        }else{
            alert('no image')
        }
        console.log(image)
    }

    useEffect(()=>{
        const uploadImage=async()=>{
            const blobImage=await new Promise((resolve,reject)=>{
                const xhr = new XMLHttpRequest();
    xhr.onload = function() {
    resolve(xhr.response);
    };
    xhr.onerror = function() {
    reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET',image, true);
    xhr.send(null);
            })
            // Create the file metadata
/** @type {any} */
const metadata = {
    contentType: 'image/jpeg'
    };
         // Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + Date.now());
const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case 'paused':
        console.log('Upload is paused');
        break;
        case 'running':
        console.log('Upload is running');
        break;
    }
    }, 
    (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    }, 
    () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
    });
    }
);   
        }
        if(image!=null){
            uploadImage()
            setImage(null)
        }
    },[image])
useLayoutEffect(()=>{
        navigation.setOptions({
    title:chatname,
    headerTitleAlign:'left',
    headerTitle:()=>(
        <View className='flex-row space-x-3 items-center'>
            <Avatar rounded source={{uri:ourData?.photoURL || 'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar'}}/>
            <Text className='text-lg text-white font-medium'>{chatname}</Text>
        </View>
    ),
    headerLeft:()=>(
<TouchableOpacity className='pl-4' onPress={()=>{navigate.goBack()}}>
    <AntDesign name='arrowleft' size={24} color='white'/>
</TouchableOpacity>
    ),
    headerRight:()=>(
        <View className='flex-row  space-x-6 pr-5'>
            <TouchableOpacity >
                <FontAwesome name='video-camera' size={24} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name='call' size={24} color='white'/>    
            </TouchableOpacity>
        </View>
    )
})
    },[])

const db=getFirestore()
const colRef=collection(db,'chats',id,'messages')
const sendMSG=()=>{
Keyboard.dismiss()
addDoc(colRef,{
    timestamp:serverTimestamp(),
    message:text,
    displayname:auth.currentUser.displayName,
    email:auth.currentUser.email,
    photoURL:auth.currentUser.photoURL
})
setText('')
}
useEffect(()=>{
const unsubscribe=query(colRef,orderBy('timestamp','asc'));
onSnapshot(unsubscribe,(data)=>{
setOurData(
    data.docs.map((items)=>{
        return items.data()
    })
)
})

},[id])

return (
    <SafeAreaView className='flex-1 '>
        <StatusBar style='light'/>
    
    <KeyboardAvoidingView
keyboardVerticalOffset={90} className='flex-1'>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <>
<ScrollView  contentContainerStyle={{
    paddingHorizontal:1,
    paddingTop:10
}}>
    {ourData.map((data)=>
        data?.email===auth.currentUser.email?(

<View key={data.id} style={{alignSelf:'flex-end'}} className='bg-[#ECECEC] mt-3 rounded-3xl mr-4 mb-5 relative w-fit p-2 flex-row space-x-3 '>
<Avatar rounded size={30} position='absolute' bottom={-20} right={-7}
source={{uri:data.photoURL}}
/>
<Text  className='items-center '>
    {data.message}
    
</Text>

</View>
        ):(
<View key={data.id}  style={{alignSelf:'flex-start'}} className='bg-[#2b68e6] rounded-3xl m-4 p-4 relative max-w-xs'>
<Avatar rounded size={30} position='absolute' bottom={-20} right={-7}
source={{uri:data.photoURL}} />
    <Text>
        {data.message}
    </Text>
<Text className='text-white text-xs pr-3 left-3'>{data.displayname}</Text>
</View>
))}
</ScrollView>
<View className='flex-row w-full  p-2 space-x-3 align-center'>
    
    <TextInput className='flex-1 pl-5 bg-[#e8e5e5] rounded-2xl  h-8 text-gray-500' 
    value={text} onChangeText={(txt)=>setText(txt)} placeholder='Message...' 
    onSubmitEditing={sendMSG}/>
    <TouchableOpacity activeOpacity={0.5} onPress={sendMSG}>
<Ionicons name='send' size={24} color="#2b68e6" />
    </TouchableOpacity>
    
    <TouchableOpacity onPress={pickImage}>
        <Ionicons name='image' size={24} color='#2b68e6'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={uploadImage}>
        <Text>up</Text>
    </TouchableOpacity>    
</View>    
</>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
</SafeAreaView>
)
}
export default ChatScreen
//13:49
