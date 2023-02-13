import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SignIn from './screens/SignIn';
import { TailwindProvider } from 'tailwindcss-react-native';
import Register from './screens/Register';
import Home from './screens/Home';
import { auth } from './Firebqse';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';

const Stack=createStackNavigator()
const globalScreenOptions={
  headerStyle:{backgroundColor:"#2c6bed"},
  headerTitlesStyle:{color:"white"},
  headerTintColor:"white",
  
}

function App() { 

return(
    <NavigationContainer >
      <TailwindProvider>
      
        <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions}>
        
          <Stack.Screen  name='signIn' component={SignIn} options={{title:'Sign Up' }}/>
          <Stack.Screen  name='Register' component={Register} options={{title:'Register' }}/>
          <Stack.Screen name='AddChat' component={AddChat} options={{title:'Chat ' }}/>
          <Stack.Screen  name='Home' component={Home} options={{title:'Friends',headerTitleAlign:'center',headerStyle:{backgroundColor:'#fff'},headerTitleStyle:{color:'black',justifyContent:'center',alignItems:'center'},headerLeft:()=>( 
          <View style={{marginLeft:20,flexDirection:'row'}}> 
            <TouchableOpacity  activeOpacity={0.5}>
            <Avatar rounded source={{uri:auth.currentUser?.photoURL}}/>
          </TouchableOpacity>   
            </View>
          )}} />
          <Stack.Screen name='Chat' component={ChatScreen} options={{headerTitleStyle:{}}}/>
        </Stack.Navigator>
    </TailwindProvider>
    </NavigationContainer>
  )
}
export default App
//38
//11:45