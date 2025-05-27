import {Client, Databases, ID, Query} from 'react-native-appwrite'
import { getUser } from './auth_appwrite';
import saved from '@/app/(tabs)/saved';

// track the searches made by user

const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROFILE_USER_COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

const client=new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database=new Databases(client);

export const updateSearchCount=async(query: string ,movie:Movie)=>{

    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal("search_term",query)
        ])
    
        if(result.documents.length>0){
            const existingMovie=result.documents[0];
    
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count:existingMovie.count+1
                }
            )
        }
        else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    search_term:query,
                    movie_id:movie.id,
                    title:movie.title,
                    count:1,
                    poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
    
            )
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    // check if a record of that search has already has been stored
    // if doc is found then simply increment the searchCount field
    // if not doc is found
        // create a new document in appwrite database ->1 
}

export const getTrendingMovies=async ():Promise<TrendingMovie[] | undefined> =>{
    try {
         const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return result.documents as unknown as TrendingMovie[];

    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// Get current user's profile document
export const getCurrentUserProfile = async (): Promise<any | null> => {
  try {
    const user = await getUser(); // Get current logged-in user
    const documentId = user?.$id; // Use the user ID (same as document ID if used during registration)

    const result = await database.getDocument(
      DATABASE_ID,
      PROFILE_USER_COLLECTION_ID,
      documentId!
    );

    return result;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// toggle save movie

export const toggleSaveMovie = async ({ userId, movie_id }: { userId: string; movie_id: string }) => {
  try {
    // Get the user profile document
    const userDoc = await database.getDocument(
      DATABASE_ID,
      PROFILE_USER_COLLECTION_ID,
      userId
    );

    const savedMovies = userDoc.saved_movies || [];

    let updatedMovies;

    if (savedMovies.includes(movie_id)) {
      // Remove the movie ID
      updatedMovies = savedMovies.filter((id: string) => id !== movie_id);
    } else {
      // Add the movie ID
      updatedMovies = [...savedMovies, movie_id];
    }

    // Update the document
    await database.updateDocument(
      DATABASE_ID,
      PROFILE_USER_COLLECTION_ID,
      userId,
      {
        saved_movies: updatedMovies,
      }
    );

    return updatedMovies;
  } catch (error) {
    console.error("Error toggling save movie:", error);
    return null;
  }
};
// getSaved Movies

