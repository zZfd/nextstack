import { Button, styled } from 'tamagui';

export const MyButton = styled(Button, {
  name: 'MyButton',
  theme: 'dark',
  color: '$color',
  pressStyle: {
    opacity: 0.8,
  },
});
