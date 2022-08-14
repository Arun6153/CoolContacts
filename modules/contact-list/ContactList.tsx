import { Contact } from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   StatusBar,
} from 'react-native';
import { ContactItem } from './contact/Contact';
import { getContactList } from './ContactList.service';

export const ContactList = () => {
   const [contacts, setContacts] = useState<Contact[]>([]);
   const isData = !!contacts;

   useEffect(() => {
      const getContacts = async () => {
         const data: Contact[] | any = await getContactList();
         setContacts(data);
      };

      getContacts();
   }, []);

   const addNewContact = () => {};

   return (
      <View style={ContactListStyles.mainContainer}>
         <View style={ContactListStyles.mainLabelViewRow}>
            <View style={ContactListStyles.mainLabelViewColumn}>
               <Text style={ContactListStyles.mainLabelColumn} />
            </View>
            <View style={ContactListStyles.mainLabelViewColumn}>
               <Text
                  style={[ContactListStyles.mainLabelColumn, ContactListStyles.mainLabel]}
               >
                  Contacts
               </Text>
            </View>
            <View
               onTouchEndCapture={() => addNewContact()}
               style={ContactListStyles.mainLabelViewColumn}
            >
               <Text
                  style={[
                     ContactListStyles.mainLabelColumn,
                     ContactListStyles.mainSubLabel,
                  ]}
               >
                  +ADD
               </Text>
            </View>
         </View>

         <SafeAreaView style={ContactListStyles.safeView}>
            <ScrollView>
               {contacts?.map?.((ele: Contact, index) => (
                  <ContactItem key={index} contact={ele} />
               ))}
            </ScrollView>
         </SafeAreaView>

         {!isData && <Text>No contacts available</Text>}
      </View>
   );
};

const ContactListStyles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      padding: 10,
   },
   mainLabelViewRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      flex: 1,
      marginHorizontal: 20,
      marginBottom: 10,
   },
   mainLabelViewColumn: {
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      height: '100%',
      flex: 1,
   },
   mainLabelColumn: {
      textAlign: 'center',
      paddingVertical: 8,
      width: '100%',
      fontFamily: 'Arial',
   },
   mainLabel: {
      fontSize: 20,
      color: '#222',
   },
   mainSubLabel: { textAlign: 'right', color: 'grey' },
   safeView: {
      flex: 7,
   },
});
