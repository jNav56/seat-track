import { useDispatch, useSelector } from "react-redux";
import { selectSearches, selectSelectedSearch } from "@/store/states/Searches/selectors";
import { Alert, Pressable, StyleSheet, VirtualizedList } from "react-native";
import { Separator } from "@/controls/Separator";
import { Search } from "@/store/states/Searches/interfaces";
import { View } from "@/controls/View";
import { IconSymbol } from "@/controls/Icons/IconSymbol";
import { useThemes } from "@/providers/Themes/ThemeProvider";
import { LocalizedText } from "@/controls/LocalizedText";
import { Screen } from "@/controls/Screen";
import { deleteSearch, setSelectedSearch } from "@/store/states/Searches/slice";

export const Searches = () => {
  const dispatch = useDispatch();
  const { colors } = useThemes();
  const searches = useSelector(selectSearches);
  const selectedSearchId = useSelector(selectSelectedSearch);

  const indicatorStyle = [
    styles.indicator,
    { backgroundColor: colors.indicator },
  ];

  const onItemPress = (item: Search) => {
    dispatch(setSelectedSearch(item.id));
  };

  const onRemoveSearch = (item: Search) => {
    Alert.alert('Remove search', 'Deleting search will also remove saved seats', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          if (selectedSearchId === item.id) {
            dispatch(setSelectedSearch(''));
          }
          dispatch(deleteSearch(item.id));
        },
      },
    ]);
  }

  return (
    <Screen>
      <VirtualizedList
        data={searches}
        renderItem={({ item }: { item: Search }) => (
          <Pressable style={styles.container} onPress={() => onItemPress(item)}>
            <View style={styles.textContainer}>
              <LocalizedText
                type='body'
                textKey={item.label}
                ellipsizeMode='tail'
                numberOfLines={1}/>
              <LocalizedText
                type='body'
                textKey={item.url}
                ellipsizeMode='tail'
                numberOfLines={1}
                subText/>
            </View>
            <View style={styles.endSection}>
            {selectedSearchId === item.id && <View style={indicatorStyle}/>}
              <Pressable style={styles.endButton} onPress={() => onRemoveSearch(item)}>
                <IconSymbol name='multiply' color={colors.icon} size={20}/>
              </Pressable>
            </View>
          </Pressable>
        )}
        keyExtractor={(item: Search) => item.id}
        getItem={(items, index) => items[index]}
        getItemCount={() => searches.length}
        ItemSeparatorComponent={() => <Separator/>}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <LocalizedText textKey='No searches made'/>
          </View>
        )}/>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textContainer: {
    flex: 1,
  },
  endSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endButton: {
    paddingStart: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 50,
  },
});
