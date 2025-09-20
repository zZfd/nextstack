import { useRouter } from 'next/navigation';
import type { NavigationOptions, UseNavigationReturn } from './useNavigation';

export function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  const getLinkProps = (options: NavigationOptions) => ({
    onPress: () => navigate(options.href),
    href: options.href, // For potential accessibility or SEO benefits
  });

  return {
    navigate,
    getLinkProps,
  };
}