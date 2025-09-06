import { Button, styled } from "tamagui";

export const MyButton = styled(Button, {
  name: "MyButton",
  backgroundColor: "$blue10",
  color: "$color",
  pressStyle: {
    backgroundColor: "$blue8",
  },
});