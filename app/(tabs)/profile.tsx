import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import { logoutUser } from '@/services/auth_appwrite';
import { router } from 'expo-router';
import { getCurrentUserProfile } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { FontAwesome } from '@expo/vector-icons';
import { images } from '@/constants/images';

const Profile = () => {
  const { data: user_profile } = useFetch(() => getCurrentUserProfile());

  const handleLogout = () => {
    logoutUser();
    router.replace('/auth/login');
  };

  // Handle date formatting safely
  const formattedDate = user_profile?.account_creation_date
    ? new Date(user_profile.account_creation_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <View className='bg-primary flex-1'>

   
             <Image source={images.bg} className="absolute w-full z-0" />
    <ScrollView className=" px-6 pt-20">
      
      {/* Profile Header */}
      <View className="items-center mb-8">
        <FontAwesome name="user-circle" size={100} color="#a8b5db" />
        <Text className="text-light-200 text-2xl font-extrabold mt-4">{user_profile?.user_name}</Text>
        <Text className="text-gray-400 text-sm mt-1">{user_profile?.email}</Text>
      </View>

      {/* Profile Details */}
      <View className="bg-dark-100 rounded-2xl p-6 mb-6">
        <Text className="text-gray-400 text-base mb-1">Joined:</Text>
        <Text className="text-light-100 text-lg font-semibold">{formattedDate}</Text>
      </View>

      {/* Saved Movies Section */}
      <View className="bg-dark-100 rounded-2xl p-6 mb-10 items-center justify-center">
        <Text className="text-gray-400 text-base mb-2">Saved Movies</Text>
        <Text className="text-white text-3xl font-bold">
          {user_profile?.saved_movies?.length ?? 0}
        </Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="bg-accent py-4 rounded-xl items-center justify-center mb-16"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
     </View>
  );
};

export default Profile;
