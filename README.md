# QuizApp

A modern, feature-rich React Native quiz application built with Expo Router, featuring category/difficulty selection, timed questions, progress tracking, question review, and intelligent time management. Optimized for mobile devices with a clean, teal-themed UI.

## Live Deployment

The app is live and available on Expo's free plan at: https://expo.dev/accounts/kassag/projects/QuizApp/builds/860f7b9e-558f-429b-aead-7134657375f9

## Features

- **Category & Difficulty Selection**: Choose from multiple trivia categories and difficulty levels (Easy, Medium, Hard)
- **Dynamic Quiz Questions**: Fetches real questions from Open Trivia Database API with intelligent fallback system
- **Timed Quizzes**: 30 seconds per question with automatic timeout handling and smart time extension
- **Progress Tracking**: Real-time score tracking with correct, incorrect, and unanswered question counts
- **Question Review**: Complete review screen showing all questions with user's answers and correct answers
- **Inline Feedback**: Immediate visual feedback with answer highlighting (green for correct, red for incorrect)
- **Fallback Questions**: 5 static questions available when API is unavailable
- **Modern UI**: Clean, responsive teal-themed design optimized for mobile devices
- **Error Handling**: Built-in error boundaries and graceful API failure handling
- **Navigation**: Smooth flow between screens with proper state management
- **Mobile Optimization**: Compact layout designed for small screens (tested on Galaxy M14)
- **Cross-Platform**: Works seamlessly on iOS, Android, and Web

## API Integration

This app integrates with the [Open Trivia Database](https://opentdb.com/) API to fetch real trivia questions. The API provides:

- Multiple choice questions across various categories (General Knowledge, Science, History, etc.)
- Difficulty levels (Easy, Medium, Hard)
- Randomized question order and answer shuffling
- HTML entity decoding for proper text display

### API Endpoints Used

- `https://opentdb.com/api.php` - Fetch questions with category and difficulty parameters

### Fallback System

When the API is unavailable, the app gracefully falls back to 5 pre-loaded static questions covering various topics with explanations for learning purposes.

## Quiz Flow

1. **Welcome Screen**: Select quiz category and difficulty level, then start a new quiz
2. **Quiz Gameplay**:
   - Answer questions within 30 seconds
   - Immediate visual feedback with answer highlighting
   - Smart time management prevents question skipping
3. **Time Management**:
   - If time runs out, shows correct answer and grants 35 seconds for next question
   - Prevents rapid time-outs from skipping questions
4. **Results Screen**: Summary with score breakdown and options to retake or review
5. **Review Screen**: Detailed review of all questions with user's answers and correct answers

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd QuizApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Project Structure

```
QuizApp/
├── app/                    # Expo Router screens
│   ├── _layout.jsx        # Root layout with navigation and providers
│   ├── index.jsx          # Welcome screen with category/difficulty selection
│   ├── quiz.jsx           # Main quiz interface with inline feedback
│   ├── results.jsx        # Quiz results with score breakdown
│   └── review.jsx         # Question review screen
├── components/            # Reusable UI components
│   ├── CategoryCard.jsx   # Category selection component
│   ├── ErrorBoundary.jsx  # Error handling component
│   └── OptionButton.jsx   # Answer option component
├── constants/             # App constants
│   └── colors.js          # Teal color theme configuration
├── contexts/              # React Context for state management
│   └── QuizContext.js     # Quiz state management (questions, answers, scores)
├── data/                  # Static data
│   └── questions.js       # Fallback questions for offline/API failure
├── services/              # API and external services
│   └── quizService.js     # OpenTDB API integration with fallback handling
├── assets/                # Images and static assets
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Modern Standards Implemented

- **React 19**: Latest React version with concurrent features
- **Expo SDK 54**: Up-to-date Expo platform with Expo Router
- **Functional Components**: Modern React patterns throughout
- **Hooks**: Extensive use of useState, useEffect, useRouter, useContext
- **Code Organization**: Well-structured folder organization with separation of concerns
- **Context API**: Global state management for quiz data
- **File-based Routing**: Expo Router for navigation
- **Error Boundaries**: Graceful error handling and crash prevention
- **API Integration**: Robust API handling with fallback systems
- **Mobile-First Design**: Responsive UI optimized for mobile devices
- **Performance**: Efficient state management and component structure
- **Accessibility**: Touch-friendly UI with proper spacing and contrast
- **Code Quality**: Prettier formatting and organized imports

## Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android emulator/device
- `npm run ios`: Run on iOS simulator
- `npm run web`: Run in web browser
- `npm run format`: Format code with Prettier
