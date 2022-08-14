import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Button,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   TextInput,
   Text,
   TouchableWithoutFeedback,
   View,
   Image,
} from 'react-native';
import { ContactFormTypes } from './ContactForm.types';

export const ContactForm = ({ route, navigation }: any) => {
   const [isAddOrganisation, setAddOrganisation] = useState<boolean>(false);
   const [isAddEmail, setAddEmail] = useState<boolean>(false);
   const [title, setTitle] = useState<string>('Add Contact');
   const [firstName, setFirstName] = useState<string>();
   const [lastName, setLastName] = useState<string>();
   const [phoneNo, setPhoneNo] = useState<string>();
   const [email, setEmail] = useState<string>();
   const [org, setOrg] = useState<string>();
   const { contactDetails } = route?.params;

   useEffect(() => {
      if (contactDetails.isEdit) {
         setTitle('Edit Contact');
         navigation.setOptions({ title });
      } else {
         setTitle('Add Contact');
         navigation.setOptions({ title });
      }
   }, []);

   const onDetailSubmit = () => {
      let formDetails = {} as ContactFormTypes;

      formDetails.firstName = firstName!;
      formDetails.lastName = lastName!;
      formDetails.phoneNo = phoneNo!;
      formDetails.organisation = org;
      formDetails.emailAddress = email;

      console.log(formDetails);
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
               <View>
                  <Text style={styles.header}>{title}</Text>
                  {/* {
                     <Image source={}/>
                  } */}
               </View>
               <View>
                  <TextInput
                     autoCapitalize="words"
                     placeholder="first name"
                     value={firstName}
                     onChangeText={setFirstName}
                     style={styles.textInput}
                  />
                  <TextInput
                     autoCapitalize="words"
                     placeholder="last name"
                     value={lastName}
                     onChangeText={setLastName}
                     style={styles.textInput}
                  />
                  <TextInput
                     keyboardType="number-pad"
                     maxLength={10}
                     value={phoneNo}
                     onChangeText={setPhoneNo}
                     placeholder="phone number"
                     style={styles.textInput}
                  />
               </View>
               <View>
                  {isAddEmail && (
                     <TextInput
                        keyboardType="email-address"
                        placeholder="email address"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                     />
                  )}
                  {!isAddEmail && (
                     <View style={styles.optionalFieldView}>
                        <Text
                           style={styles.optionalFields}
                           onPress={() => setAddEmail(true)}
                        >
                           Add email address
                        </Text>
                        <Text style={styles.optionalFields}>+</Text>
                     </View>
                  )}
               </View>
               <View>
                  {isAddOrganisation && (
                     <TextInput
                        placeholder="organisation"
                        value={org}
                        onChangeText={setOrg}
                        style={styles.textInput}
                     />
                  )}
                  {!isAddOrganisation && (
                     <View style={styles.optionalFieldView}>
                        <Text
                           style={styles.optionalFields}
                           onPress={() => setAddOrganisation(true)}
                        >
                           Add organisation
                        </Text>
                        <Text style={styles.optionalFields}>+</Text>
                     </View>
                  )}
               </View>
               <View style={styles.btnContainer}>
                  <Button title="Submit" onPress={() => onDetailSubmit()} />
               </View>
            </View>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
   },
   inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
   },
   header: {
      fontSize: 36,
      marginBottom: 48,
   },
   textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
   },
   btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
   },
   optionalFields: {
      color: '#0000EE',
   },
   optionalFieldView: {
      paddingVertical: 5,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
});
