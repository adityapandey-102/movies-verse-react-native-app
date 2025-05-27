import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return <>
  <StatusBar hidden={true}/>
  <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    <Stack.Screen name="movies/[id]" options={{headerShown:false}}/>
    <Stack.Screen name="auth/login" options={{headerShown:false}}/>
    <Stack.Screen name="auth/register" options={{headerShown:false}}/>
  </Stack>
  </>;
  
  
}
