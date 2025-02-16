import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { IconSymbol, IconSymbolName } from "../Icons/IconSymbol";
import { useThemes } from "@/providers/Themes/ThemeProvider";
import { LocalizedText } from "../LocalizedText";
import { View } from "../View";

interface IProps {
  label?: string;
  icon: IconSymbolName;
  disabled?: boolean;
  onPress: () => void;
}

export const CircleButton = ({ label, icon, disabled, onPress }: IProps) => {
  const { colors } = useThemes();

  const getButtonStyle = ({ pressed }: { pressed: boolean }) => [
    styles.button,
    {
      backgroundColor: colors.primary,
      opacity: pressed || disabled ? 0.5 : 1,
    },
  ];

  return (
    <View style={styles.container}>
      <Pressable
        style={getButtonStyle}
        onPress={onPress}>
        <IconSymbol color={colors.invertText} name={icon} size={30}/>
      </Pressable>
      {label && (
        <LocalizedText
          style={{ color: colors.primary }}
          textKey={label}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
