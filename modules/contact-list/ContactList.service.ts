import * as Contacts from 'expo-contacts';

let calls = 0;
export const getContactList = async () => {
   const { status } = await Contacts.requestPermissionsAsync();
   console.log(++calls);

   if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
         fields: [Contacts.PHONE_NUMBERS],
      });

      return data;
   }

   return null;
};
