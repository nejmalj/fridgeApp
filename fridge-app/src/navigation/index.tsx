import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Fridge } from './screens/Fridge';
import { Scan } from './screens/Scan';
import { NotFound } from './screens/NotFound';

const HomeTabs = createBottomTabNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {
                title: 'Accueil',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" size={size} color={color} />
                ),
            },
        },
        Fridge: {
            screen: Fridge,
            options: {
                title: 'Frigo',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="kitchen" size={size} color={color} />
                ),
            },
        },
        Scan: {
            screen: Scan,
            options: {
                title: 'Scan',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="qr-code-scanner" size={size} color={color} />
                ),
            },
        },
    },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Fridge: {
      screen: Fridge,
      options: {
        title: 'Fridge',
        headerShown: false,
      },
    },
    Scan: {
      screen: Scan,
      options: {
        title: 'Scan',
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
