import CustomTextInput from '@/components/CustomTextInput'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { loginUser } from '@/services/auth_appwrite'
import { Link, router } from 'expo-router'
import { routePatternToRegex } from 'expo-router/build/fork/getStateFromPath-forks'
import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
 const onLoginPress = async () => {
   try {
     // Email validation regex
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
     if (!email || !emailRegex.test(email)) {
       alert("Please enter a valid email address.");
       return;
      }
      
      if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }
      setLoading(true);

    const session=await loginUser(email,password);

    if (session) {
      setLoading(false);
      console.log(session);
      router.replace('/')
    }

  } catch (error) {
    setLoading(false);
    console.log("Login Error:", error);
    alert("Something went wrong. Please try again.");
  }
}

  

  return (
  
       <KeyboardAvoidingView
      className=" bg-primary"
      style={{flex:1}}
      behavior={'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
  
       <Image source={images.bg} className="absolute w-full z-0" />
      <View className='flex-1 items-center justify-center px-5 min-h-[100%] '>
        <Image source={icons.logo} className="w-12 h-10 mb-16 mx-auto" />
        <Text className='text-light-200 text-xl mb-10'>Welcome back, you've been missed</Text>
        <View className='w-full gap-y-6'>

        <CustomTextInput 
        placeholder='Email'
        iconName='envelope'
        value={email}
        onChangeText={(text:string)=>setEmail(text)}
        />
        <CustomTextInput 
        placeholder='Password'
        iconName='unlock-alt'
        typePassword={true}
        value={password}
        onChangeText={(text:string)=>setPassword(text)}
        />
        </View>
        
        <TouchableOpacity className='flex items-center py-4 bg-accent w-full px-5 mx-6 my-8 rounded-lg'
        onPress={onLoginPress}
        >
          {loading ? 
          <ActivityIndicator
           size='small'
           color='#0000ff'
           className="mt-10 self-center"
         />
         :
         <Text className='text-white font-bold text-xl'>Login</Text>
          
        }
        </TouchableOpacity>

        <View className='flex-row'>
          <Text className='text-white'>Not a member?</Text>
          <Link href={'/auth/register'}>
          <Text className='text-accent'> Register Now</Text>
          </Link>
        </View>
      </View>
     
      </KeyboardAvoidingView>

  )
}

export default Login