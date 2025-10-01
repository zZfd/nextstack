import { View } from 'react-native';

import { Text } from './text';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <View className="grid gap-1">
              {title && (
                <ToastTitle>
                  <Text>{title}</Text>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>
                  <Text>{description}</Text>
                </ToastDescription>
              )}
            </View>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
