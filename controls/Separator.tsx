import { StyleSheet } from "react-native";
import { View } from "./View";
import { useThemes } from "@/providers/Themes/ThemeProvider";

interface IProps {
  vertical?: number;
  horizontal?: number;
}

export const Separator = ({
  vertical = 0,
  horizontal = 0,
}: IProps) => {
  const { colors } = useThemes();

  const containerStyle =[
    styles.container,
    {
      borderColor: colors.border,
      marginVertical: vertical,
      marginHorizontal: horizontal,
    }
  ];

  return <View style={containerStyle}/>
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
});
