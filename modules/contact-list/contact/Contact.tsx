import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ContactItem = (props: any) => {
   const { contact } = props;
   const touched = () => {
      console.log('touches');
   };

   return (
      <View style={ContactItemStyles.contactItem} onTouchEndCapture={() => touched()}>
         <Text>{`${contact?.firstName} ${contact?.lastName}`}</Text>
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
