import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import OnboardingItem from './OnboardingItem';
import slides from './Slide';
import { Button } from "native-base";
import { Stack, router } from "expo-router";
export default Onboarding = () => {
  return (
    <>
    <Stack.Screen options={{headerShown:false}}/>
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
      />
      <Button position={'absolute'} zIndex={1} bottom={10} w={150} onPress={()=>router.replace('/newloginscreen')}>Skip</Button>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});