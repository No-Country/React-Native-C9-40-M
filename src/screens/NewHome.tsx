import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from '../constants';
import { LoginScreen } from './auth/Login';
import { RegisterScreen } from './auth/Register';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Drawer.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
    </Drawer.Navigator>
  );
}
