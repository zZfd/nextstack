import { useRouter } from 'expo-router'

import type { NavigationOptions, UseNavigationReturn } from './useNavigation'

export function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  const navigate = (href: string): void => {
    router.push(href);
  };

  const getLinkProps = (options: NavigationOptions): { onPress: () => void } => ({
    onPress: () => navigate(options.href),
  });

  return {
    navigate,
    getLinkProps,
  };
}