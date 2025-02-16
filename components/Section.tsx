import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEntitySearches } from '@/store/states/Searches/selectors';
import { Screen } from '@/controls/Screen';
import { View } from '@/controls/View';
import { TopHeader } from '@/controls/Headers/TopHeader';
import { LocalizedText } from '@/controls/LocalizedText';
import { Separator } from '@/controls/Separator';

interface IParams {
  route: {
    params :{
      searchId: string;
      section: string;
    };
  };
}

export const Section = ({ route }: IParams) => {
  const { searchId, section } = route.params;
  const [sortAsc, setSortAsc] = useState(true);
  const searches = useSelector(selectEntitySearches);

  const seats = searches[searchId].seats[section];
  const seatIds = useMemo(() =>
    Object.keys(seats).sort((a, b) => {

      const getType = (val: string) => {
        if (/^[0-9]+$/.test(val)) return 0; // Number
        if (val.length === 1) return 1; // Single letter
        return 2; // Double letter
      };
    
      const first = sortAsc ? a : b;
      const second = sortAsc ? b : a;

      const typeA = getType(first);
      const typeB = getType(second);
    
      if (typeA !== typeB) {
        return typeA - typeB; // Sort by type first
      }
      
      return first[0].localeCompare(second[0]); // Sort alphabetically/numerically within types
    }
  ), [sortAsc]);

  const headerTitle = `Section ${section}`;
  const sortProp = {
    asc: sortAsc,
    action: () => {
      setSortAsc((prev) => !prev);
    },
  };

  return (
    <Screen>
      <TopHeader textKey={headerTitle} sort={sortProp}/>
      <View style={styles.paddingView}>
        <VirtualizedList
          data={seatIds}
          renderItem={({ item }: { item: string }) => (
            <Pressable style={styles.container} onPress={() => {}}>
              <View style={{ flexDirection: 'row' }}>
                <LocalizedText textKey='Row - '/>
                <LocalizedText type='commonSB' textKey={item}/>
              </View>
              <View style={{ flexDirection: 'row', columnGap: 5 }}>
                <LocalizedText textKey='Seats -'/>
                <LocalizedText textKey={[...seats[item]].sort((a, b) => Number(a) - Number(b)).join(', ')}/>
              </View>
            </Pressable>
          )}
          keyExtractor={(item: string) => item}
          getItem={(items, index) => items[index]}
          getItemCount={() => seatIds.length}
          ItemSeparatorComponent={() => <Separator/>}
          ListEmptyComponent={(
            <View style={styles.emptyContainer}>
              <LocalizedText textKey='No seats found'/>
            </View>
          )}/>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  paddingView: {
    flex: 1,
    marginTop: 16,
    marginBottom : 60,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
