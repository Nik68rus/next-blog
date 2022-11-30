import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
import MainNavigation from './main-navigation';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const notificationCtx = useContext(NotificationContext);
  const { notification } = notificationCtx;
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </>
  );
}

export default Layout;
