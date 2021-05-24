<h1 align="center">🧙‍♀️ North Berwick</h1>

<h4 align="center">Mobile-app game</h4>

<blockquote align="center">
  <em>North Berwick is a mobile interactive story about witch-hunting.</em>
</blockquote>

## 🎃 Requirements

- Node >= 14.16
- **Android**
  - JAVA OpenJDK 8 _`brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`_
  - Android NDK R21 _`brew install android-ndk`_
  - Android Studio >= 4.2 [follow this guide](https://reactnative.dev/docs/environment-setup)
  - Android SDK Build-Tools 29.0.2
  - Android SDK Platform 29 (with Google APIs Intel x86 Atom System Image)
- **iOS**
- XCode >= 12.5
- Ruby >= 3
- Pod >= 1.10.1

Configure the ANDROID_HOME environment variable in your `.bash-profile` or `.bashrc` and `source` it:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

export ANDROID_NDK_HOME=/usr/local/share/android-ndk
```

## 🪄 Install

```
yarn
cd ios
pod install
```

## 🧹 Getting started

This app use AR/VR modules and realtime 3D so you'll need a physical device to start the development.

### iOS

Open `ios/NorthBerwick.xcworkspace` with XCode, select your device and run the app with `cmd+R`.

### Android

Run `yarn android`.
