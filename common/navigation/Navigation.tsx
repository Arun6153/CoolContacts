import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { ContactList } from '../../modules/contact-list/ContactList';
import { ContactForm } from '../components/contact-form/ContactForm';

export const Navigation = () => {
   const Stack = createNativeStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="contact-list">
            <Stack.Screen
               name="contact-list"
               options={{
                  title: 'Contact List',
                  headerTintColor: NavigationStyles.header.color,
                  headerTitleAlign: 'center',
               }}
               component={ContactList}
            />
            <Stack.Screen
               name="contact-form"
               options={{
                  title: 'Add Contact',
               }}
               component={ContactForm}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

const NavigationStyles = StyleSheet.create({
   header: {
      // fontFamily: 'sans-serif',
      color: '2d2d2d',
   },
});
