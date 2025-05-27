import { Account, Client, Databases, ID } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

const account = new Account(client);
const database2=new Databases(client);


// Register a new user
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
  
 
    // Create user document
    await database2.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      newUser.$id,
      {
        user_id:newUser.$id,
        user_name:name,
        email:email,
        account_creation_date:new Date().toLocaleDateString('en-US'),
        saved_movies: [],
      }
    );
    // Automatically create a session (log in)
    await account.createEmailPasswordSession(email, password);
    return newUser;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

// Log in an existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Get current logged-in user
export const getUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    // console.error("Get User Error:", error);
    return null;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};
