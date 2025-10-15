# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

MovieVerse is a React Native movie discovery app built with Expo, featuring user authentication, movie search, trending movies, and saved movies functionality. The app integrates with The Movie Database (TMDb) API for movie data and Appwrite for backend services.

## Development Commands

### Core Development
- **Start development server**: `npm run start` or `expo start`
- **Run on Android**: `npm run android` or `expo start --android`
- **Run on iOS**: `npm run ios` or `expo start --ios`
- **Run on Web**: `npm run web` or `expo start --web`
- **Install dependencies**: `npm install`

### Code Quality
- **Lint code**: `npm run lint` or `expo lint`
- **Reset project**: `npm run reset-project` (moves starter code to app-example)

### Build & Deploy
- **Development build**: `eas build --profile development`
- **Preview build**: `eas build --profile preview`
- **Production build**: `eas build --profile production`

## Architecture & Structure

### Routing Architecture
- Uses **Expo Router** with file-based routing
- Tab-based navigation with 4 main screens: Home, Search, Saved, Profile
- Stack navigation for movie details and authentication screens
- Root layout in `app/_layout.tsx` manages screen configurations

### Key Architectural Patterns

#### Data Layer
- **Services Pattern**: All external API calls centralized in `services/` directory
  - `api.ts`: TMDb API integration for movie data
  - `appwrite.ts`: Appwrite database operations (search tracking, user profiles, saved movies)
  - `auth_appwrite.ts`: Authentication operations
  - `useFetch.ts`: Custom hook for data fetching with loading states

#### State Management
- Uses React hooks and custom `useFetch` hook for state management
- No global state library - relies on prop drilling and local state
- Search tracking and trending movies stored in Appwrite database

#### Component Architecture
- **Reusable Components**: `MovieCard`, `TrendingCard`, `SearchBar`, `CustomTextInput`
- **Screen Components**: Located in `app/` directory following Expo Router structure
- **Styled with NativeWind**: Tailwind CSS classes for React Native styling

### Backend Integration

#### Appwrite Services
- **Authentication**: User registration, login, logout with session management
- **Database Collections**:
  - Search tracking: Stores search queries and counts for trending calculation
  - User profiles: User data and saved movies list
- **Environment Variables Required**:
  - `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
  - `EXPO_PUBLIC_APPWRITE_DATABASE_ID` 
  - `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`
  - `EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID`

#### TMDb API Integration
- Fetches popular movies and search results
- Requires `EXPO_PUBLIC_MOVIE_API_KEY` environment variable
- Uses both discover and search endpoints
- Image URLs constructed with `https://image.tmdb.org/t/p/w500` base path

### Styling System
- **NativeWind**: Tailwind CSS for React Native
- **Custom Color Palette**: Defined in `tailwind.config.js`
  - Primary: `#030014` (dark background)
  - Secondary: `#151312` (secondary dark)
  - Accent: `#AB8BFF` (purple accent)
  - Light variants: `#D6C6FF`, `#A8B5DB`, `#9CA4AB`
  - Dark variants: `#221f3d`, `#0f0d23`

### Type Definitions
- **Global Interfaces**: Defined in `interfaces/interfaces.d.ts`
- Key types: `Movie`, `MovieDetails`, `TrendingMovie`
- TypeScript strict mode enabled

## Development Guidelines

### File Structure Patterns
- **Screens**: Place in `app/` directory following Expo Router conventions
- **Components**: Reusable UI components in `components/` directory
- **Services**: API and backend logic in `services/` directory
- **Constants**: Static assets and configurations in `constants/` directory
- **Types**: Global type definitions in `interfaces/` directory

### Navigation Patterns
- Use `Link` component from `expo-router` for navigation
- Dynamic routes: `[id].tsx` for movie details
- Tab navigation handled in `app/(tabs)/_layout.tsx`
- Stack navigation configured in root `app/_layout.tsx`

### Data Fetching Patterns
- Use `useFetch` custom hook for API calls with loading states
- Implement error handling in all service functions
- Search functionality includes both API calls and local database tracking

### Authentication Flow
- User registration creates both Appwrite user and profile document
- Session-based authentication with automatic login after registration
- Profile data includes saved movies array for bookmarking functionality

### Environment Setup
- Copy environment variables for both TMDb API and Appwrite configuration
- Ensure all `EXPO_PUBLIC_` prefixed variables are set for the app to function
- Use Expo development build for testing native features