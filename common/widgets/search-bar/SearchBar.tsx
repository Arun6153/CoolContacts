import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export const SearchBar = () => {
   const [searched, setSearched] = useState<string>();

   return (
      <View style={{ flex: 1 }}>
         <TextInput
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={setSearched}
            value={searched}
            placeholder="search here..."
            clearButtonMode="while-editing"
         />
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: '#0d98bd',
      color: 'white',
      backgroundColor: '#0d98bd',
   },
});
