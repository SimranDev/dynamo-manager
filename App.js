import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import PostForm from './src/screens/PostForm';

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <PostForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // backgroundColor: 'red',
  },
  scrollView: {
    marginHorizontal: 16,
  },
});

export default App;
