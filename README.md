
# React Native Setup Guide

A brief description Setting up the development environment



## macOs

You will need Node, Watchman, the React Native command line interface, Xcode and CocoaPods.
While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

```bash
 brew install node
 brew install watchman       
```
#### Xcode ####
If you have already installed Node on your system, make sure it is Node 12 or newer.

The easiest way to install Xcode is via the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.
If you have already installed Xcode on your system, make sure it is version 10 or newer.

#### Command Line Tools ####
You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

#### Installing an iOS Simulator in Xcode ####
To install a simulator, open Xcode > Preferences... and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use
  
### Running Project ###
Open Command line tool

Clone this repo

```bash
 git clone {url}       
```

``` cd ``` into the clone project folder and type

```bash
 npm install       
```

To start Metro, run
```bash
 npx react-native start    
```

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
```bash
 npx react-native run-ios 
```
You should see your new app running in the iOS Simulator shortly.

For any error or to learn how to setup react native for windows [click here](https://reactnative.dev/docs/environment-setup)
