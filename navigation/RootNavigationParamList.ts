import { SectionInfo } from '@/store/states/Searches/interfaces';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Web: undefined;
  Searches: undefined;
  Seats: undefined;
};

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabParamList>;
  Section: { searchId: string, section: SectionInfo };
};
