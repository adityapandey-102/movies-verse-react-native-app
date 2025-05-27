import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { icons } from '@/constants/icons'
import { FontAwesome } from '@expo/vector-icons';
interface Props{
onPress?:()=>void,
onChangeText?:(text:string)=>void,
placeholder:string,
value?:string,
iconName:string
typePassword?:boolean
};

const CustomTextInput = ({
    onPress,
    onChangeText,
    placeholder,
    value,
    iconName,
    typePassword=false
}:Props
) => {
  return  (
      <View className='flex-row items-center bg-dark-200 rounded-full px-6 py-4 '>
      <FontAwesome name={iconName as React.ComponentProps<typeof FontAwesome>['name']} size={24} color="#a8b5db" />
        <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
        secureTextEntry={typePassword}
        />
      </View>
    )
}

export default CustomTextInput