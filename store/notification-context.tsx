import { INotification } from '../types/index';
import { createContext, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

interface INotificationContext {
  notification: null | INotification;
  showNotification: (notification: INotification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: (notification: INotification) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props: Props) => {
  const [activeNotification, setActiveNotification] =
    useState<INotification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notification: INotification) => {
    console.log('showing');

    setActiveNotification(notification);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
