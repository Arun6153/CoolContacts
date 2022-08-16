import { Contact } from 'expo-contacts';
import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Button,
   Keyboard,
   KeyboardAvoidingView,
   TextInput,
   Text,
   TouchableWithoutFeedback,
   View,
   Image,
   TouchableOpacity,
   Linking,
} from 'react-native';
import { contactDetailsSubmit, deleteContact } from './ContactForm.service';
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
         navigation.setOptions({ title: 'Edit Contact' });
         updateFields();
      } else {
         setTitle('Add Contact');
         navigation.setOptions({ title: 'Add Contact' });
      }
   }, []);

   const updateFields = () => {
      const data = contactDetails.contact as Contact;

      setFirstName(data?.firstName);
      setLastName(data?.lastName);

      if (data?.phoneNumbers) {
         setPhoneNo(data?.phoneNumbers[0]?.number);
      }
      if (data?.emails) {
         setAddEmail(true);
         setEmail(data?.emails[0].email);
      }
      if (data?.company) {
         setAddOrganisation(true);
         setOrg(data?.company);
      }
   };

   const onDetailSubmit = async () => {
      let formDetails = {} as ContactFormTypes;

      formDetails.firstName = firstName!;
      formDetails.lastName = lastName!;
      formDetails.phoneNo = phoneNo!;
      formDetails.organisation = org;
      formDetails.emailAddress = email;

      const isSubmitted = await contactDetailsSubmit(
         contactDetails.isEdit,
         formDetails,
         contactDetails.contact
      );

      if (isSubmitted) {
         navigation.navigate('contact-list', { refresh: true });
      }
   };

   const deleteContactPopUp = () => {
      const result = deleteContact(contactDetails?.contact?.id);

      if (!!result) {
         navigation.navigate('contact-list', { refresh: true });
      }
   };

   return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
         <View style={styles.subHeader}>
            <Text style={styles.header}>{title}</Text>
            {contactDetails.isEdit && (
               <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <TouchableOpacity
                     style={{
                        borderRadius: 50,
                        padding: 2,
                        borderColor: 'white',
                        borderWidth: 1,
                     }}
                     onPress={() => Linking.openURL(`tel:${phoneNo}`)}
                  >
                     <Image
                        style={{
                           height: 40,
                           width: 40,
                        }}
                        source={{
                           uri: 'https://www.pngall.com/wp-content/uploads/10/Call-PNG-Picture.png',
                        }}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{
                        borderRadius: 50,
                        padding: 2,
                        borderColor: 'white',
                        borderWidth: 1,
                        marginLeft: 10,
                     }}
                     onPress={() => deleteContactPopUp()}
                  >
                     <Image
                        style={{ height: 40, width: 40, borderRadius: 50 }}
                        source={{
                           uri: 'https://www.pngkey.com/png/full/203-2036190_trash-icon-recycle-bin-circle-icon.png',
                        }}
                     />
                  </TouchableOpacity>
               </View>
            )}
         </View>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
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
                  <Button
                     color={'white'}
                     title="Submit"
                     onPress={() => onDetailSubmit()}
                  />
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
      padding: 20,
      paddingTop: 0,
      flex: 1,
      justifyContent: 'space-around',
   },
   header: {
      fontSize: 36,
      color: 'white',
   },
   textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 26,
   },
   subHeader: {
      backgroundColor: '#0d98bd',
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
   },
   btnContainer: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: '#0d98bd',
      color: 'white',
      backgroundColor: '#0d98bd',
      marginTop: 12,
   },
   optionalFields: {
      color: '#5089e5',
   },
   optionalFieldView: {
      paddingVertical: 5,
      marginVertical: 10,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
});
