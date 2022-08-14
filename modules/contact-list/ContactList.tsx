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

export const ContactList = ({ navigation }: any) => {
   const [contacts, setContacts] = useState<Contact[]>([]);
   const isData = !!contacts;

   useEffect(() => {
      const getContacts = async () => {
         const data: Contact[] | any = await getContactList();
         setContacts(data);
      };

      getContacts();
   }, []);

   const addNewContact = () => {
      navigation.navigate('contact-form', {
         contactDetails: { contact: null, isEdit: false },
      });
   };

   return (
      <View style={ContactListStyles.mainContainer}>
         <View style={ContactListStyles.mainLabelViewRow}>
            <View style={ContactListStyles.mainLabelViewColumn}>
               <Text
                  style={[ContactListStyles.mainLabelColumn, ContactListStyles.mainLabel]}
               >
                  Contacts
               </Text>
            </View>
            <View style={ContactListStyles.mainLabelViewColumn}>
               <Text
                  onPress={() => addNewContact()}
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
                  <ContactItem key={index} contact={ele} navigation={navigation} />
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
      backgroundColor: 'white',
   },
   mainLabelViewRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flex: 1,
      marginHorizontal: 20,
   },
   mainLabelViewColumn: {
      flexDirection: 'column',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height: '100%',
      flex: 1,
   },
   mainLabelColumn: {
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
