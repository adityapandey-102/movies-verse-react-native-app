import CustomTextInput from '@/components/CustomTextInput'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { registerUser } from '@/services/auth_appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
      const [loading,setLoading]=useState(false);
    

    const onRegisterPress = async () => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const account = await registerUser(email, password, name);

    if (account) {
      setLoading(false);
      console.log("Registered successfully:", account);
      router.replace('/'); // Navigate to home screen
    }

  } catch (error) {
    setLoading(false);
    console.log("Register Error:", error);
    alert("Something went wrong during registration.");
  }
};

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
        <Text className='text-light-200 text-xl mb-10'>Let's create an account for you</Text>
        <View className='w-full gap-y-6'>

        <CustomTextInput 
        placeholder='Full name'
        iconName='user'
        value={name}
        onChangeText={(text:string)=>setName(text)}
        />
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
        <CustomTextInput 
        placeholder='Confirm Password'
        iconName='unlock-alt'
        typePassword={true}
        value={confirmPassword}
        onChangeText={(text:string)=>setConfirmPassword(text)}
        />
        </View>
        
        <TouchableOpacity className='flex items-center py-4 bg-accent w-full px-5 mx-6 my-8 rounded-lg'
        onPress={onRegisterPress}>
         {loading ? 
                   <ActivityIndicator
                    size='small'
                    color='#0000ff'
                    className="mt-10 self-center"
                  />
                  :
                  <Text className='text-white font-bold text-xl'>Register</Text>
                   
                 }
        </TouchableOpacity>

        <View className='flex-row'>
          <Text className='text-white'>Already a member?</Text>
          <Link href={'/auth/login'}>
          <Text className='text-accent'> Login Now</Text>
          </Link>
        </View>
      </View>
     
      </KeyboardAvoidingView>

  )
}

export default Register