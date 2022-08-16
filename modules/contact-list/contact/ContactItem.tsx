import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity,
   Platform,
   Linking,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { deleteContact } from '../../../common/components/contact-form/ContactForm.service';

export const ContactItem = (props: any) => {
   const { contact, navigation } = props;
   const isIOS = Platform.OS === 'ios';

   const touched = () => {
      if (isIOS) {
         navigation.navigate('contact-form', {
            contactDetails: { contact, isEdit: true },
         });
      } else {
         Contacts.presentFormAsync(contact.id);
      }
   };

   return (
      <TouchableOpacity
         onPress={() => touched()}
         style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
         <View style={ContactItemStyles.contactItem}>
            <View>
               <Image
                  style={{ height: 40, width: 40 }}
                  source={{
                     uri: 'https://uybor.uz/borless/uybor/img/user-images/no-avatar.png',
                  }}
               />
            </View>
            <Text style={ContactItemStyles.contactItemText}>
               {contact?.firstName
                  ? contact.firstName +
                    ' ' +
                    (contact?.midName ? contact?.midName + ' ' : '') +
                    ' ' +
                    (contact?.lastName ? contact?.lastName : '')
                  : contact.phoneNumbers[0].number}
            </Text>
         </View>
         {!isIOS && (
            <View style={{ flexDirection: 'row', marginRight: 15, paddingTop: 10 }}>
               <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${contact.phoneNumbers[0].number}`)}
               >
                  <Image
                     style={{ height: 30, width: 30, borderRadius: 50 }}
                     source={{
                        uri: 'https://www.pngall.com/wp-content/uploads/10/Call-PNG-Picture.png',
                     }}
                  />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => deleteContact(contact?.contact?.id)}
                  style={{ marginLeft: 10 }}
               >
                  <Image
                     style={{ height: 30, width: 30, borderRadius: 50 }}
                     source={{
                        uri: 'https://www.pngkey.com/png/full/203-2036190_trash-icon-recycle-bin-circle-icon.png',
                     }}
                  />
               </TouchableOpacity>
            </View>
         )}
      </TouchableOpacity>
   );
};

const ContactItemStyles = StyleSheet.create({
   contactItem: {
      marginHorizontal: 20,
      marginVertical: 10,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
   },
   contactItemText: {
      marginLeft: 10,
      paddingTop: 10,
      height: '100%',
   },
});
