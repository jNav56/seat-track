import { useSelector } from "react-redux";
import { selectEntitySearches, selectSelectedSearch } from "@/store/states/Searches/selectors";
import { Pressable, ScrollView, StyleSheet, VirtualizedList } from "react-native";
import { Separator } from "@/controls/Separator";
import { View } from "@/controls/View";
import { IconSymbol } from "@/controls/Icons/IconSymbol";
import { useThemes } from "@/providers/Themes/ThemeProvider";
import { LocalizedText } from "@/controls/LocalizedText";
import { Screen } from "@/controls/Screen";
import { useAppNavigation } from "@/navigation";
import { useEffect, useMemo, useState } from "react";
import { TopHeader } from "@/controls/Headers/TopHeader";
import { SectionInfo } from "@/store/states/Searches/interfaces";

export const Seats = () => {
  const navigation = useAppNavigation();
  const { colors } = useThemes();

  // Redux store data
  const searches = useSelector(selectEntitySearches);
  const selectedSearchId = useSelector(selectSelectedSearch);
  const selectedSearch = searches[selectedSearchId];

  // Variables to use in component
  const [filter, setFilter] = useState<'ALL' | 'STANDARD' | 'FLASHSEATS' >('ALL');
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [seats, setSeats] = useState<SectionInfo[]>([]);
  const sortIcon =
    sort === 'none' ? 'arrow.up.arrow.down' :
    (sort === 'asc' ? 'arrow.up': 'arrow.down');

  // Transformed seats
  const filteredSeats = useMemo(() => {
    if (filter === 'STANDARD') {
      return seats.filter((x) => x.numStandard);
    } else if (filter === 'FLASHSEATS') {
      return seats.filter((x) => x.numResale);
    }

    return seats;
  }, [filter, seats]);
  const sortedSeats = useMemo(() => {
    const sortField = filter === 'ALL' ?
      'seats' : (filter === 'STANDARD' ? 'numStandard' : 'numResale');

    if (sort === 'asc') {
      return [...filteredSeats].sort((a, b) => a[sortField] - b[sortField]);
    } else if (sort === 'desc') {
      return [...filteredSeats].sort((a, b) => b[sortField] - a[sortField]);
    }

    return filteredSeats;
  }, [sort, filteredSeats]);

  // Get fetch time
  const lastFetch = selectedSearch?.lastFetch ?? '';
  const retrievedTime = new Date(lastFetch);

  useEffect(() => {
    if (selectedSearch) {
      const transFormedArray = Object.entries(selectedSearch.seats).map(([section, rows]) => {
        const rowKeys = Object.keys(rows);
        const numberOfRows = rowKeys.length;

        let numberOfSeats = 0;
        let numOfStandard = 0;
        let numOfResale = 0;

        Object.values(rows).forEach((seatsArray) => {
          numberOfSeats += seatsArray.length;

          seatsArray.forEach(({ type }) => {
            if (type === 'STANDARD') {
              numOfStandard += 1;
            } else {
              numOfResale += 1;
            }
          });
        });

        return {
          section,
          rows: numberOfRows,
          seats: numberOfSeats,
          numStandard: numOfStandard,
          numResale: numOfResale,
        }
      });
      setSeats(transFormedArray);
    }
  }, [selectedSearch]);

  const goToSection = (section: SectionInfo) => {
    navigation.navigate(
      'Section',
      { searchId: selectedSearchId, section },
    );
  };

  const getText = (item: SectionInfo) => (
    <ScrollView style={{ flexDirection: 'row' }} horizontal>
      <LocalizedText textKey='Section '/>
      <LocalizedText type='commonSB' style={{ color: 'black' }} textKey={item.section}/>
      <LocalizedText textKey=', Rows '/>
      <LocalizedText type='commonSB' style={{ color: 'black' }} textKey={`${item.rows}`}/>
      <LocalizedText textKey={', Seats '}/>
      <LocalizedText type='commonSB' style={{ color: 'black' }} textKey={`${item.seats}`}/>
      {!!item.numStandard && (
        <>
          <LocalizedText textKey=", "/>
          <LocalizedText textKey="S " style={{ color: colors.primary }}/>
          <LocalizedText type='commonSB' style={{ color: colors.primary }} textKey={`${item.numStandard}`}/>
        </>
      )}
      {!!item.numResale && (
        <>
          <LocalizedText textKey=", "/>
          <LocalizedText textKey="R " style={{ color: colors.secondary }}/>
          <LocalizedText type='commonSB' style={{ color: colors.secondary }} textKey={`${item.numResale}`}/>
        </>
      )}
    </ScrollView>
  );

  const getFilterStyle = (val: string) => [
    styles.filterButton,
    filter === val ? {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    } : {},
  ]

  const getTextFilterStyle = (val: string) => ({
    color: filter === val ? colors.invertText : colors.text,
  });

  const handleSort = () => {
    if (sort === 'none') {
      setSort('asc');
    } else if (sort === 'asc') {
      setSort('desc')
    } else {
      setSort('none');
    }
  };

  return (
    <Screen>
      <TopHeader
        textKey="Last fetch done at:"
        subText={retrievedTime.toLocaleString()}
        sort={{
          icon: sortIcon,
          action: handleSort,
        }}
        disableHeader/>
      {sortedSeats.length > 0 && (
        <View style={{ flexDirection: 'row', columnGap: 8, paddingVertical: 10 }}>
          <Pressable style={getFilterStyle('ALL')} onPress={() => { setFilter('ALL') }}>
            <LocalizedText style={getTextFilterStyle('ALL')} type='smallStrong' textKey="All"/>
          </Pressable>
          <Pressable style={getFilterStyle('STANDARD')} onPress={() => { setFilter('STANDARD') }}>
            <LocalizedText style={getTextFilterStyle('STANDARD')} type='smallStrong' textKey="Standard"/>
          </Pressable>
          <Pressable style={getFilterStyle('FLASHSEATS')} onPress={() => { setFilter('FLASHSEATS') }}>
            <LocalizedText style={getTextFilterStyle('FLASHSEATS')} type='smallStrong' textKey="Resale"/>
          </Pressable>
        </View>
      )}
      {selectedSearchId ? (
        <VirtualizedList
        data={sortedSeats}
        renderItem={({ item }: { item: SectionInfo }) => (
          <Pressable
            style={styles.container}
            onPress={() => { goToSection(item) }}>
            {getText(item)}
            <IconSymbol name='chevron.right' color={colors.icon} size={20}/>
          </Pressable>
        )}
        keyExtractor={(item: SectionInfo) => item?.section}
        getItem={(items, index) => items[index]}
        getItemCount={() => sortedSeats.length}
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 15,
  },
});
