import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ContactItem = (props: any) => {
   const { contact, navigation } = props;
   const touched = () => {
      navigation.navigate('contact-form', { contactDetails: { contact, isEdit: true } });
   };

   return (
      <View style={ContactItemStyles.contactItem}>
         <Text
            onPress={() => touched()}
         >{`${contact?.firstName} ${contact?.lastName}`}</Text>
      </View>
   );
};

const ContactItemStyles = StyleSheet.create({
   contactItem: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
      marginVertical: 10,
   },
});
