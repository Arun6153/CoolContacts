import { Contact } from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   RefreshControl,
   Platform,
} from 'react-native';
import { SearchBar } from '../../common/widgets/search-bar/SearchBar';
import { ContactItem } from './contact/ContactItem';
import { getContactList } from './ContactList.service';
import * as Contacts from 'expo-contacts';

export const ContactList = ({ route, navigation }: any) => {
   const [contacts, setContacts] = useState<Contact[]>([]);
   const [refreshing, setRefreshing] = useState<boolean>(false);
   const isIOS = Platform.OS === 'ios';
   const isData = !!contacts;
   const _routes = route?.params;

   useEffect(() => {
      getContacts();
   }, []);

   useEffect(() => {
      if (_routes?.refresh) {
         getContacts(false);
      }
   }, [_routes?.refresh]);

   const getContacts = async (isRefresh = true) => {
      if (isRefresh) setRefreshing(isRefresh);
      const data: Contact[] | any = await getContactList();
      setContacts(data);
      if (isRefresh) setRefreshing(!isRefresh);
   };

   const addNewContact = () => {
      // if (isIOS) {
      navigation.navigate('contact-form', {
         contactDetails: { contact: null, isEdit: false },
      });
      // } else {
      //    Contacts.addContactAsync({}:any);
      // }
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
            {isIOS && (
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
            )}
         </View>

         <View style={{ flex: 1 }}>
            <SearchBar />
         </View>

         <SafeAreaView style={ContactListStyles.safeView}>
            <ScrollView
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={() => getContacts()}
                  />
               }
            >
               {contacts?.map?.((ele: Contact, index) => (
                  <ContactItem key={index} contact={ele} navigation={navigation} />
               ))}
            </ScrollView>
            {!isData && <Text>No contacts available</Text>}
         </SafeAreaView>
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
      marginHorizontal: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flex: 1,
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
      // fontFamily: 'sans-serif',
   },
   mainLabel: {
      fontSize: 20,
      color: '#222',
   },
   mainSubLabel: { textAlign: 'right', color: 'grey' },
   safeView: {
      flex: 10,
      marginTop: 40,
   },
});
