import { Stack } from "expo-router";


const noHead = { headerShown: false };

const StackLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={noHead} />
      </Stack>
  );
};

export default StackLayout;