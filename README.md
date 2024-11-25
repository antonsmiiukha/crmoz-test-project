>**Environment**:
> 
> Processor: Apple M1 Pro
> 
> OS: Sequoia 15.0.1
> 
> Node version: v22.8.0

>**Tested on**:
>
> Apple: iPhone SE (3rd generation) Simulator, iPhone 16 Simulator
> 
> Android: Pixel 6 API 31 Simulator


## Project installation

In the root directory of the project
```zsh
yarn install
```

```zsh
cd ios && pod install && cd ..
```


## Setting up project configurations

 - Set api geocoder api key in `src/config/google.ts` - for iOS and in `android/app/src/main/AndroidManifest.xml`(`com.google.android.geo.API_KEY`) - for Android. I can share for testing my own. This needed for converting address to geo coordinates.


## Running the project

```zsh
yarn start
```
and press <kbd>i</kbd> for iOS or <kbd>a</kbd> for Android

### The second way

for iOS

```zsh
yarn ios 
```

for Android 

```zsh
yarn android
```

### This is generally the most common way to start a react-native project
