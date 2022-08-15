import { ContactFormTypes } from './ContactForm.types';
import * as Contacts from 'expo-contacts';

export const contactInitialObj: ContactFormTypes = {
   firstName: '',
   lastName: '',
   phoneNo: '',
   emailAddress: '',
   organisation: '',
};

export const contactDetailsSubmit = async (
   isEdit: boolean,
   data: ContactFormTypes,
   contactOrig: Contacts.Contact
) => {
   try {
      if (!isEdit) {
         const contact: Contacts.Contact = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumbers: [
               {
                  number: data.phoneNo,
                  isPrimary: true,
                  digits: data.phoneNo,
                  countryCode: 'IN',
                  id: '1',
                  label: 'main',
               },
            ],
            emails: [
               {
                  email: data.emailAddress,
                  isPrimary: true,
                  id: '2',
                  label: 'main',
               },
            ],
            company: data.organisation,
            id: '',
            contactType: '',
            name: '',
         };
         await Contacts.addContactAsync(contact);
      } else {
         contactOrig.company = data.organisation;
         contactOrig.firstName = data.firstName;
         contactOrig.lastName = data.lastName;
         if (contactOrig?.emails) {
            const emails = contactOrig?.emails;
            emails[0].email = data.emailAddress;
         }
         if (contactOrig?.phoneNumbers) {
            const phoneNumbers = contactOrig?.phoneNumbers;
            phoneNumbers[0].number = data.phoneNo;
         }
         contactOrig.company = data.organisation;
         await Contacts.updateContactAsync(contactOrig);
      }

      return true;
   } catch (err) {
      return false;
   }
};
