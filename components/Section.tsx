import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEntitySearches } from '@/store/states/Searches/selectors';
import { Screen } from '@/controls/Screen';
import { View } from '@/controls/View';
import { TopHeader } from '@/controls/Headers/TopHeader';
import { LocalizedText } from '@/controls/LocalizedText';
import { Separator } from '@/controls/Separator';
import { SectionInfo } from '@/store/states/Searches/interfaces';
import { useThemes } from '@/providers/Themes/ThemeProvider';

interface IParams {
  route: {
    params :{
      searchId: string;
      section: SectionInfo;
    };
  };
}

export const Section = ({ route }: IParams) => {
  const { colors } = useThemes();
  const { searchId, section } = route.params;
  const [sortAsc, setSortAsc] = useState(true);
  const searches = useSelector(selectEntitySearches);

  const seats = searches[searchId].seats[section.section];
  const rowIds = useMemo(() =>
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

  const headerTitle = `Section ${section.section}`;
  const sortProp = {
    asc: sortAsc,
    action: () => {
      setSortAsc((prev) => !prev);
    },
  };
  
  const getNumberText = (rowId: string) => {
    const seatsInRow =
      [...seats[rowId]].sort((a, b) => Number(a.number) - Number(b.number));

    return (
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {seatsInRow.map((x, index) => (
          <View key={x.number} style={{ flexDirection: 'row' }}>
            {!!index && <LocalizedText textKey=', '/>}
            <LocalizedText
              style={{
                color: x.type === 'STANDARD' ? colors.primary : colors.secondary,
              }}
              type='commonSB'
              textKey={`${x.number}`}/>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Screen>
      <TopHeader textKey={headerTitle} sort={sortProp}/>
      <View style={{ flexDirection: 'row', paddingTop: 5 }}>
        <LocalizedText textKey='('/>
        <LocalizedText style={{ color: colors.primary }} textKey='Standard'/>
        <LocalizedText textKey=', '/>
        <LocalizedText style={{ color: colors.secondary }} textKey='Resale'/>
        <LocalizedText textKey=')'/>
      </View>
      <View style={styles.paddingView}>
        <VirtualizedList
          data={rowIds}
          renderItem={({ item }: { item: string }) => (
            <Pressable style={styles.container} onPress={() => {}}>
              <View style={{ flexDirection: 'row' }}>
                <LocalizedText textKey='Row - '/>
                <LocalizedText type='commonSB' textKey={item}/>
              </View>
              <View style={{ flexDirection: 'row', columnGap: 5 }}>
                <LocalizedText textKey='Seats -'/>
                {getNumberText(item)}
              </View>
            </Pressable>
          )}
          keyExtractor={(item: string) => item}
          getItem={(items, index) => items[index]}
          getItemCount={() => rowIds.length}
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
    marginTop: 5,
    marginBottom : 60,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
