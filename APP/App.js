import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import RegisterStepOneScreen from './screens/RegisterStepOneScreen'
import RegisterStepTwoScreen from './screens/RegisterStepTwoScreen'
import RegisterStepThreeScreen from './screens/RegisterStepThreeScreen'
import RegisterStepFourScreen from './screens/RegisterStepFourScreen'
import RegisterStepFiveScreen from './screens/RegisterStepFiveScreen'
import TestLoginScreen from './screens/TestLoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import DetailCourseScreen from './screens/DetailCourseScreen'
import DetailRecipeScreen from './screens/DetailRecipeScreen'
import CreateRecipeStepOneScreen from './screens/CreateRecipeStepOneScreen'
import CreateRecipeStepTwoScreen from './screens/CreateRecipeStepTwoScreen'
import CreateRecipeStepThreeScreen from './screens/CreateRecipeStepThreeScreen';
import SplashScreen from './screens/SplashScreen';
const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FA8C1E',
        },
        headerTintColor: '#00000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} // hide header en splash
      />
      <Stack.Screen name="CreateRecipeStepThreeScreen" component={CreateRecipeStepThreeScreen} />
      <Stack.Screen name="CreateRecipeStepTwoScreen" component={CreateRecipeStepTwoScreen} />
      <Stack.Screen name="CreateRecipeStepOneScreen" component={CreateRecipeStepOneScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailRecipeScreen" component={DetailRecipeScreen} />
      <Stack.Screen name="RegisterStepOneScreen" component={RegisterStepOneScreen} />
      <Stack.Screen name="RegisterStepTwoScreen" component={RegisterStepTwoScreen} />
      <Stack.Screen name="RegisterStepThreeScreen" component={RegisterStepThreeScreen} />
      <Stack.Screen name="RegisterStepFourScreen" component={RegisterStepFourScreen} />
      <Stack.Screen name="RegisterStepFiveScreen" component={RegisterStepFiveScreen} />
      <Stack.Screen name="DetailCourseScreen" component={DetailCourseScreen} />
      <Stack.Screen name="TestLoginScreen" component={TestLoginScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
