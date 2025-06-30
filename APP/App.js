import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import RegisterStepOneScreen from './screens/RegisterStepOneScreen';
import RegisterStepTwoScreen from './screens/RegisterStepTwoScreen';
import RegisterStepThreeScreen from './screens/RegisterStepThreeScreen';
import RegisterStepFourScreen from './screens/RegisterStepFourScreen';
import RegisterStepFiveScreen from './screens/RegisterStepFiveScreen';
import TestLoginScreen from './screens/TestLoginScreen';
import ForgotPasswordStepOneScreen from './screens/ForgotPasswordStepOneScreen';
import ForgotPasswordStepTwoScreen from './screens/ForgotPasswordStepTwoScreen';
import ForgotPasswordStepThreeScreen from './screens/ForgotPasswordStepThreeScreen';
import DetailRecipeScreen from './screens/DetailRecipeScreen';
import DetailCourseScreen from './screens/DetailCourseScreen';
import SelectSedeScreen from './screens/SelectSedeScreen';
import PaymentSummaryScreen from './screens/PaymentSummaryScreen';
import CreateRecipeStepOneScreen from './screens/CreateRecipeStepOneScreen';
import CreateRecipeStepTwoScreen from './screens/CreateRecipeStepTwoScreen';
import CreateRecipeStepThreeScreen from './screens/CreateRecipeStepThreeScreen';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createStackNavigator();

function MyStack() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const minSplashTime = 2100; 

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, minSplashTime);

    // Cuando loading cambia a false, verificamos si ya pasó el tiempo mínimo
    if (!loading) {
      timer; // aseguramos que el timer siga su curso
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading || showSplash) {
    return <SplashScreen />;
  }



  if (loading) {
    // Mientras carga los datos del usuario mostramos el splash
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FA8C1E',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!user ? (
        // Pantallas para usuarios no autenticados (públicas)
        <>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TestLoginScreen" component={TestLoginScreen} />
          <Stack.Screen name="RegisterStepOneScreen" component={RegisterStepOneScreen} />
          <Stack.Screen name="RegisterStepTwoScreen" component={RegisterStepTwoScreen} />
          <Stack.Screen name="RegisterStepThreeScreen" component={RegisterStepThreeScreen} />
          <Stack.Screen name="RegisterStepFourScreen" component={RegisterStepFourScreen} />
          <Stack.Screen name="RegisterStepFiveScreen" component={RegisterStepFiveScreen} />
          <Stack.Screen name="ForgotPasswordStepOneScreen" component={ForgotPasswordStepOneScreen} />
          <Stack.Screen name="ForgotPasswordStepTwoScreen" component={ForgotPasswordStepTwoScreen} />
          <Stack.Screen name="ForgotPasswordStepThreeScreen" component={ForgotPasswordStepThreeScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </>
      ) : (
        // Pantallas para usuarios autenticados (privadas)
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CreateRecipeStepOneScreen" component={CreateRecipeStepOneScreen} />
          <Stack.Screen name="CreateRecipeStepTwoScreen" component={CreateRecipeStepTwoScreen} />
          <Stack.Screen name="CreateRecipeStepThreeScreen" component={CreateRecipeStepThreeScreen} />
          <Stack.Screen name="DetailRecipeScreen" component={DetailRecipeScreen} />
          <Stack.Screen name="DetailCourseScreen" component={DetailCourseScreen} />
          <Stack.Screen name="SelectSedeScreen" component={SelectSedeScreen} />
          <Stack.Screen name="PaymentSummaryScreen" component={PaymentSummaryScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RegisterStepFourScreen" component={RegisterStepFourScreen} />
          <Stack.Screen name="RegisterStepFiveScreen" component={RegisterStepFiveScreen} />
          <Stack.Screen name="ForgotPasswordStepOneScreen" component={ForgotPasswordStepOneScreen} />
          <Stack.Screen name="ForgotPasswordStepTwoScreen" component={ForgotPasswordStepTwoScreen} />
          <Stack.Screen name="ForgotPasswordStepThreeScreen" component={ForgotPasswordStepThreeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
