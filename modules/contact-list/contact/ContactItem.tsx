import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const ContactItem = (props: any) => {
   const { contact, navigation } = props;
   const touched = () => {
      navigation.navigate('contact-form', { contactDetails: { contact, isEdit: true } });
   };

   return (
      <TouchableOpacity onPress={() => touched()} style={ContactItemStyles.contactItem}>
         <View>
            <Image
               style={{ height: 40, width: 40 }}
               source={{
                  uri: 'https://uybor.uz/borless/uybor/img/user-images/no-avatar.png',
               }}
            />
         </View>
         <Text style={ContactItemStyles.contactItemText}>{`${contact?.firstName} ${
            contact?.midName ? contact?.midName + ' ' : ''
         }${contact?.lastName ? contact?.lastName : ''}`}</Text>
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
   },
});
