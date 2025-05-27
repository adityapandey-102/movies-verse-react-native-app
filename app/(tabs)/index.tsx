import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { getUser } from "@/services/auth_appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [accountLoading,setAccountLoading]=useState(true);

  useEffect(() => {
    IsUserLoggedIn();
  }, [])

  const IsUserLoggedIn=async()=>{
    const user= await getUser();
    if(user===null){
      router.replace('/auth/login');
    }
    else{
      setAccountLoading(false);
    }
  }
  

  const {
    data: trendingMovies,
    loading:tendingMoviesLoading,
    error:trendMoviesError
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: "" }));


  return (
    <View className="flex-1 bg-primary">
      {
        accountLoading
      ?<View className="flex justify-center items-centerr h-full flex-1">
      <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt-10 self-center"
          /></View>

          :
      <>
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10
      }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      {/* // Movies */}
        {moviesLoading || tendingMoviesLoading? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt-10 self-center"
          />
        ) : moviesError || trendMoviesError ? (
          <Text>Error: {moviesError?.message || trendMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
              {/* // Search Bar */}
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
                />

                {trendingMovies && (
                  <View className="mt-10">
                    <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={()=>(
                      <View className="w-4"/>
                    )}
                    data={trendingMovies} 
                    renderItem={({item,index})=>(
                   <TrendingCard movie={item} index={index}/>
                   )}

                   keyExtractor={(item)=>item.movie_id.toString()}
                    />
                  </View>
                )}
                {/* // Display Movies Here */}
                <>
                  {/* // Heading */}
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

                  {/* // Movies List */}
                   <FlatList
                   data={movies}
                   renderItem={({item})=>(
                   <MovieCard
                   {...item}
                   />
                   )}
                   keyExtractor={(item)=>item.id.toString()}
                   numColumns={3}
                   columnWrapperStyle={{
                    justifyContent:"flex-start",
                    gap:20,
                    paddingRight:5,
                    marginBottom:10,
                   }}
                   className="mt-2 pb-32"
                   scrollEnabled={false}
                   />
                </>
            </View>
        )
        }
      </ScrollView>
      </>
}
    </View>
  );
}
