import { StyleSheet, Pressable } from 'react-native';
import { LocalizedText } from '@/controls/LocalizedText';
import { View } from '@/controls/View';
import { IconSymbol } from '@/controls/Icons/IconSymbol';
import { useAppNavigation } from '@/navigation';
import { useThemes } from '@/providers/Themes/ThemeProvider';

interface IProps {
  textKey: string;
  subText?: string;
  disableHeader?: boolean;
  sort?: {
    asc: boolean;
    action: () => void;
  };
}

export const TopHeader = ({
  textKey,
  subText,
  disableHeader,
  sort,
}: IProps) => {
  const navigation = useAppNavigation();
  const { colors } = useThemes();

  return (
    <View style={styles.container}>
      <View style={styles.startContainer}>
        {!disableHeader && (
          <Pressable
            style={styles.button}
            onPress={() => { 
              navigation.goBack();
            }}>
            <IconSymbol name={'chevron.left'} color='#9BA1B5' size={16}/>
          </Pressable>
        )}
        <View style={styles.textContainer}>
          <LocalizedText style={styles.mainText} type='subtitle' textKey={textKey}/>
          {subText && <LocalizedText type='bodyMedium' textKey={subText}/>}
        </View>
      </View>
      {sort && (
        <Pressable onPress={sort.action}>
          <IconSymbol name={sort.asc ? 'arrow.up': 'arrow.down'} size={24} color={colors.icon}/>
        </Pressable>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startContainer: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 4,
    paddingEnd: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 500,
  },
});
