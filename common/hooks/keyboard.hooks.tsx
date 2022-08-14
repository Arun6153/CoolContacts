import { FC, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const KeyboardStatusHook: any = () => {
   const [isKeyboardVisible, setisKeyboardVisible] = useState<boolean>(false);

   useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
         setisKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
         setisKeyboardVisible(false);
      });

      return () => {
         showSubscription.remove();
         hideSubscription.remove();
      };
   }, []);

   return isKeyboardVisible;
};
