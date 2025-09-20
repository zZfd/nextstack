export interface NavigationOptions {
  href: string;
}

export interface UseNavigationReturn {
  navigate: (href: string) => void;
  getLinkProps: (options: NavigationOptions) => {
    onPress: () => void;
    href?: string;
  };
}

export declare function useNavigation(): UseNavigationReturn;