import { useState, useContext, useEffect, useRef } from "react";
import { Text, Icon, Box, HStack, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "../components/Button";
import { ModeContext } from "../context/modeContext";
import { modeConstant } from "../constant/modeConstant";

export function Display() {
  const [icon, setIcon] = useState<string>("brain");
  const [color, setColor] = useState<string>("#FFD9D9");
  const [borderColor, setBorderColor] = useState<string>("#471515");
  const [buttonMainColor, setButtonPlayColor] = useState("#FF7C7C");
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState("#FFD9D9");
  const [fontColor, setFontColor] = useState<string>("#471515");
  const [playCountdown, setPlayCountdown] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10 * 60);

  const timerId = useRef<undefined | number>();

  const { mode, setMode, nextMode } = useContext(ModeContext);

  const { FOCUS_MODE, LONGBREAK_MODE, SHORTBREAK_MODE, getString } =
    modeConstant;

  const showMinute = (time: number) => {
    let minutes: number | string = Math.floor(time / 60);

    if (minutes < 10) return "0" + minutes;
    return minutes;
  };

  const showSeconds = (time: number) => {
    let minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = Math.floor(time - minutes * 60);

    if (seconds < 10) return "0" + seconds;
    return seconds;
  };

  const handlePlayCountdown = () => {
    setPlayCountdown(!playCountdown);
  };

  useEffect(() => {
    mode === getString(FOCUS_MODE) ? setIcon("brain") : setIcon("coffee");

    mode === getString(SHORTBREAK_MODE) && setColor("#DAFAE0");
    mode === getString(FOCUS_MODE) && setColor("#FFD9D9");
    mode === getString(LONGBREAK_MODE) && setColor("#F2F9FF");

    mode === getString(SHORTBREAK_MODE) && setBorderColor("#14401D");
    mode === getString(FOCUS_MODE) && setBorderColor("#471515");
    mode === getString(LONGBREAK_MODE) && setBorderColor("#153047");

    mode === getString(SHORTBREAK_MODE) && setButtonPlayColor("#8CE8A1");
    mode === getString(FOCUS_MODE) && setButtonPlayColor("#FF7C7C");
    mode === getString(LONGBREAK_MODE) && setButtonPlayColor("#8BCAFF");

    mode === getString(SHORTBREAK_MODE) && setButtonSecondaryColor("#DAFAE0");
    mode === getString(FOCUS_MODE) && setButtonSecondaryColor("#FFD9D9");
    mode === getString(LONGBREAK_MODE) && setButtonSecondaryColor("#D9EEFF");

    mode === getString(SHORTBREAK_MODE) && setFontColor("#14401D");
    mode === getString(FOCUS_MODE) && setFontColor("#471515");
    mode === getString(LONGBREAK_MODE) && setFontColor("#153047");
  }, [mode]);

  useEffect(() => {
    if (playCountdown) {
      timerId.current = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [playCountdown]);

  return (
    <>
      <HStack
        display="flex"
        mb={"8"}
        space={2}
        justifyContent="center"
        backgroundColor={color}
        borderColor={borderColor}
        borderWidth={2}
        borderRadius={"full"}
        px={5}
        py={1.5}
        _light={{ color: "black" }}
      >
        <Icon
          as={MaterialCommunityIcons}
          name={icon}
          size={"2xl"}
          color={fontColor}
        />
        <Text fontSize={"xl"} fontWeight={"medium"} color={fontColor}>
          {(mode === getString(FOCUS_MODE) && "Focus") ||
            (mode === getString(SHORTBREAK_MODE) && "Short Break") ||
            (mode === getString(LONGBREAK_MODE) && "Long Break")}
        </Text>
      </HStack>
      <Box>
        <Text fontSize={"250"} lineHeight={250} height={250}>
          {showMinute(countdown)}
        </Text>
        <Text fontSize={"250"} lineHeight={250} height={250}>
          {showSeconds(countdown)}
        </Text>
      </Box>
      <Box>
        <HStack alignItems="center" space={5}>
          <Button
            color={buttonSecondaryColor}
            icon="dots-horizontal"
            size="2xl"
            radius={16}
            px={4}
            py={3}
          />
          <Button
            color={buttonMainColor}
            icon={playCountdown ? "pause" : "play"}
            size="4xl"
            radius={20}
            px={8}
            py={5}
            onPress={() => handlePlayCountdown()}
          />
          <Button
            color={buttonSecondaryColor}
            icon="fast-forward"
            size="2xl"
            radius={15}
            px={4}
            py={3}
            onPress={() => nextMode()}
          />
        </HStack>
      </Box>
    </>
  );
}
