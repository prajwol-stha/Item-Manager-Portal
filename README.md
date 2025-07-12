# Item Manager Portal - React Native Cli

## About the project

This project is an item manager portal, where users can add, update, read and delete the items. 

It uses **Context API** to manage the global state of the data, and uses **Async Storage** to save data to the local storage and **React Navigation** to navigate between screens.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Installing Dependencies

```sh
 npm i 
 ```

## Step 2: Build and run your app

### Android

```sh
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

# Note:
- Make sure to connect a physical device or run the emulator.