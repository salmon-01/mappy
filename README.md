# Mappy

#### A travel scratch map. Mark the places you've been to.

## Project description

Mappy is an interactive map that lets you highlight the countries you have been to as well as mark the countries you want to visit.

### Features

- Highlight countries that you've been to
- Highlight countries that you want to visit
- Dashboard view of countries
- Breakdown statistics of your travels

## Tech Stack

#### Front-end

- Typescript - TypeScript extends JavaScript by adding types to the language.
- [React native](https://reactnative.dev/docs/environment-setup) - React Native lets you create truly native apps!
- [Expo](https://docs.expo.dev/) - Expo is a framework that makes developing native apps easier
- [MapboxRN](https://rnmapbox.github.io/) - Add custom interactive maps to mobile applications..

#### Back-end

- [Express] - fast node.js network app framework 
- [Supabase](https://supabase.com/docs) - Supabase is an open source Firebase alternative.

## Installation

#### Git clone this repo with
``` 
git clone https://github.com/salmon-01/mappy.git
```

#### For back-end environments:
##### Create a .env file in server folder
#
```sh
SUPABASE_URL="your public supabase url"
SUPABASE_KEY="your public supabase key"
```

#### For front-end environments:
##### Create a .env file in Mappy folder
#
```sh
EXPO_PUBLIC_SUPABASE_URL="your public supabase url"
EXPO_PUBLIC_SUPABASE_ANON_KEY="your public supabase key"
EXPO_PUBLIC_MAPBOX_KEY=your public mapbox key (ex.: pk.ey...)
```

### Run the project

> [!IMPORTANT]
> Currently it is only possible to locally run the app with iOS simulator.
> Make sure you have latest version of XCode and CLI for project to run properly

#### Back-end

``` cd server ```

``` npm i ```

``` nodemon index.js ```

#### Front-end 

``` cd Mappy ```

``` npm i ```

``` npx expo start -c ```

Switch to development build by entering ``` s ``` in the terminal, then enter ``` i ``` to load the iOS simulator
