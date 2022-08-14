import * as Contacts from "expo-contacts";

export const getContactList = async () => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS],
    });

    return data;
  }

  return null;
};
