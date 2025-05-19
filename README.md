# NAS App

A Front-End for a NAS (Network-attached storage) created in React-Native with react-native-document-picker and react-native-async-storage 

## Features

- User creation
- User authentication
- Folder creation
- Renaming folder and files 
- File uploads
- Environment variable management with `dotenv`


---

## Tech Stack

- React-native
- react-native-document-picker
- @react-native-async-storage/async-storage
- @react-navigation/native 
- stack/bottom-tabs
---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/elioteloi/nas-app
cd nas-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file to connect to your backend server

```bash
# IP address or hostname of the server to connect to the network
HOSTNAME=127.0.0.1
```

### 4. Start the Metro Server

First, you will need to start **Metro**.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### 5. Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
