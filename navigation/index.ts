import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootNavigationParamList';

export const useAppNavigation = useNavigation<
	StackNavigationProp<RootStackParamList>
>;
