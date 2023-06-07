import { Box, Icon, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ButtonProps = {
    icon: string
    color: string
    size?: string
    radius?: number
    px?: number
    py?: number
    setMode?: React.Dispatch<React.SetStateAction<string>>
    onPress?: () => void
    onPressIn?: () => void
    onPressOut?: () => void
}

export function Button({ icon, color, size = '2xl', radius = 15, px = 4, py = 3, onPress, onPressIn, onPressOut }: ButtonProps) {

  return (
    <Pressable onPress={() => onPress!()} onPressIn={() => onPressIn!()} onPressOut={() => onPressOut!()}>
      <Box backgroundColor={color} borderRadius={radius} px={px} py={py}>
        <Icon as={MaterialCommunityIcons} name={icon} size={size} />
      </Box>
    </Pressable>
  );
}
