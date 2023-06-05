import React from "react";
import { Text, View } from 'react-native'
import { Main } from "./src/screens/Main";
import { ModeProvider } from "./src/context/modeContext";

export default function App() {
  return (
    <ModeProvider>
      <Main />
    </ModeProvider>
  );
}

