import { useSelector } from "react-redux";
import { selectEntitySearches, selectSelectedSearch } from "@/store/states/Searches/selectors";
import { Pressable, StyleSheet, VirtualizedList } from "react-native";
import { Separator } from "@/controls/Separator";
import { View } from "@/controls/View";
import { IconSymbol } from "@/controls/Icons/IconSymbol";
import { useThemes } from "@/providers/Themes/ThemeProvider";
import { LocalizedText } from "@/controls/LocalizedText";
import { Screen } from "@/controls/Screen";
import { useAppNavigation } from "@/navigation";

export const Seats = () => {
  const navigation = useAppNavigation();
  const { colors } = useThemes();
  const searches = useSelector(selectEntitySearches);
  const selectedSearchId = useSelector(selectSelectedSearch);
  const selectedSearch = searches[selectedSearchId];
  const seats = selectedSearch.seats;
  const sectionIds = Object.keys(seats);
  const lastFetch = selectedSearch.lastFetch;
  const retrievedTime = new Date(lastFetch);

  const getNumberOfRows = (sectionId: string) => {
    const section = seats[sectionId];

    return Object.keys(section).length;
  };

  const getNumberOfSeats = (sectionId: string) => {
    const section = seats[sectionId];
    let count = 0;

    Object.values(section).forEach((x) => {
      count += x.length;
    });

    return count;
  };

  const goToSection = (sectionId: string) => {
    navigation.navigate(
      'Section',
      { searchId: selectedSearchId, section: sectionId },
    );
  };

  return (
    <Screen>
      <LocalizedText type='header' textKey='Last fetch done at:'/>
      <LocalizedText textKey={retrievedTime.toLocaleString()}/>
      {selectedSearchId ? (
        <VirtualizedList
        data={sectionIds}
        renderItem={({ item }: { item: string }) => (
          <Pressable
            style={styles.container}
            onPress={() => { goToSection(item) }}>
            <View style={{ flexDirection: 'row' }}>
              <LocalizedText textKey='Section - '/>
              <LocalizedText type='commonSB' textKey={`${item}`}/>
              <LocalizedText textKey={`: Rows ${getNumberOfRows(item)}, `}/>
              <LocalizedText textKey={`Seats ${getNumberOfSeats(item)}`} />
            </View>
            <IconSymbol name='chevron.right' color={colors.icon} size={20}/>
          </Pressable>
        )}
        keyExtractor={(item: string) => item}
        getItem={(items, index) => items[index]}
        getItemCount={() => sectionIds.length}
        ItemSeparatorComponent={() => <Separator/>}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <LocalizedText textKey='No sections found'/>
          </View>
        )}/>
      ) : (
        <LocalizedText textKey='No search selected' center/>
      )}
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
