import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  HStack,
  Center,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";
import { Display } from "./Display";
import { ModeContext } from "../context/modeContext";

import { modeConstant } from "../constant/modeConstant";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export function Main() {
  const [color, setColor] = useState<string>('#FFF2F2')

  const modeContext = useContext(ModeContext)

  useEffect(() => {
    if (modeContext.mode === 'focus') setColor('#FFF2F2')
    if (modeContext.mode === 'shortBreak') setColor('#F2FFF5')
    if (modeContext.mode === 'longBreak') setColor('#F2F9FF')
  }, [modeContext.mode])
  

  return (
      <NativeBaseProvider>
      <Center px={4} flex={1} bgColor={color}>
        <VStack space={0} alignItems="center">
          <Display />
          {/* <ToggleDarkMode /> */}
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
