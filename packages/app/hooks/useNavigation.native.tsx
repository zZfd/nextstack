import { useRouter } from 'expo-router';
import type { NavigationOptions, UseNavigationReturn } from './useNavigation';

export function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  const getLinkProps = (options: NavigationOptions) => ({
    onPress: () => navigate(options.href),
  });

  return {
    navigate,
    getLinkProps,
  };
}