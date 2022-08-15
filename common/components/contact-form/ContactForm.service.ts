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
         console.log(contactOrig['id']);

         const contact: any = {
            [Contacts.Fields.FirstName]: data.firstName,
            [Contacts.Fields.LastName]: data.lastName,
            [Contacts.Fields.PhoneNumbers]: [
               { number: data.phoneNo, digits: data.phoneNo, countryCode: 'IN' },
            ],
            [Contacts.Fields.Emails]: [{ email: data.emailAddress, isPrimary: true }],
            [Contacts.Fields.Company]: data.organisation,
            id: contactOrig.id,
            contactType: contactOrig.name,
            name: contactOrig.contactType,
         };

         await Contacts.updateContactAsync(contact);
      }

      return true;
   } catch (err) {
      console.log(err);
      return false;
   }
};
