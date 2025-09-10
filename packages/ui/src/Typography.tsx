import {
  HeadingProps,
  ParagraphProps,
  styled,
  H1 as TamaguiH1,
  H2 as TamaguiH2,
  H3 as TamaguiH3,
  H4 as TamaguiH4,
  H5 as TamaguiH5,
  H6 as TamaguiH6,
  Paragraph as TamaguiParagraph,
  Text as TamaguiText,
  TextProps,
} from 'tamagui';

export interface TypographyTextProps extends TextProps {
  variant?:
    | 'default'
    | 'muted'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
}
export interface TypographyHeadingProps extends HeadingProps {
  variant?:
    | 'default'
    | 'muted'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
}
export interface TypographyParagraphProps extends ParagraphProps {
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
}

// Enhanced Text component with theme colors
export const Text = ({
  variant = 'default',
  ...props
}: TypographyTextProps) => {
  const getColor = () => {
    switch (variant) {
      case 'muted':
        return '$mutedForeground';
      case 'destructive':
        return '$destructive';
      case 'success':
        return '$success';
      case 'warning':
        return '$warning';
      case 'info':
        return '$info';
      default:
        return '$foreground';
    }
  };

  return <TamaguiText {...props} color={getColor()} fontFamily='$body' />;
};

// Enhanced Paragraph component
export const Paragraph = ({
  variant = 'default',
  ...props
}: TypographyParagraphProps) => {
  const getProps = () => {
    switch (variant) {
      case 'muted':
        return {
          color: '$mutedForeground' as const,
        };
      case 'lead':
        return {
          fontSize: '$6' as const,
          color: '$mutedForeground' as const,
        };
      case 'large':
        return {
          fontSize: '$5' as const,
          fontWeight: '$2' as const,
          color: '$foreground' as const,
        };
      case 'small':
        return {
          fontSize: '$3' as const,
          fontWeight: '$2' as const,
          color: '$foreground' as const,
        };
      default:
        return {
          color: '$foreground' as const,
        };
    }
  };

  const variantProps = getProps();

  return (
    <TamaguiParagraph
      fontFamily='$body'
      lineHeight='$5'
      {...variantProps}
      {...props}
    />
  );
};

// Enhanced heading components with consistent theming
export const Heading1 = styled(TamaguiH1, {
  name: 'H1',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$4',
  fontSize: '$10',
  lineHeight: '$7',
});

export const Heading2 = styled(TamaguiH2, {
  name: 'H2',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$9',
  lineHeight: '$6',
});

export const Heading3 = styled(TamaguiH3, {
  name: 'H3',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$8',
  lineHeight: '$5',
});

export const Heading4 = styled(TamaguiH4, {
  name: 'H4',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$7',
  lineHeight: '$4',
});

export const Heading5 = styled(TamaguiH5, {
  name: 'H5',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$6',
  lineHeight: '$3',
});

export const Heading6 = styled(TamaguiH6, {
  name: 'H6',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$5',
  lineHeight: '$2',
});

// Aliases for common usage
export const H1 = Heading1;
export const H2 = Heading2;
export const H3 = Heading3;
export const H4 = Heading4;
export const H5 = Heading5;
export const H6 = Heading6;
