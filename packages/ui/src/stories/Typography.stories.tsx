import type { Meta, StoryObj } from '@storybook/react';

import { Text, H1, H2, H3, H4, H5, H6 } from '../Typography';

// Text Stories
const textMeta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content',
    },
    fontSize: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8'],
      description: 'Font size',
    },
    color: {
      control: 'text',
      description: 'Text color',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'Font weight',
    },
  },
};

export default textMeta;
type TextStory = StoryObj<typeof textMeta>;

export const DefaultText: TextStory = {
  args: {
    children: 'This is default text',
  },
};

export const LargeText: TextStory = {
  args: {
    children: 'This is large text',
    fontSize: '$6',
  },
};

export const SmallText: TextStory = {
  args: {
    children: 'This is small text',
    fontSize: '$2',
  },
};

export const BoldText: TextStory = {
  args: {
    children: 'This is bold text',
    fontWeight: 'bold',
  },
};

export const ColoredText: TextStory = {
  args: {
    children: 'This is colored text',
    color: '$blue10',
  },
};

// Headings Stories
const headingMeta: Meta<typeof H1> = {
  title: 'Typography/Headings',
  component: H1,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Heading1: StoryObj<typeof H1> = {
  render: () => <H1>Heading 1</H1>,
  parameters: {
    docs: {
      description: {
        story: 'The largest heading, typically used for page titles.',
      },
    },
  },
};

export const Heading2: StoryObj<typeof H2> = {
  render: () => <H2>Heading 2</H2>,
  parameters: {
    docs: {
      description: {
        story: 'Second level heading, used for major sections.',
      },
    },
  },
};

export const Heading3: StoryObj<typeof H3> = {
  render: () => <H3>Heading 3</H3>,
  parameters: {
    docs: {
      description: {
        story: 'Third level heading, used for subsections.',
      },
    },
  },
};

export const Heading4: StoryObj<typeof H4> = {
  render: () => <H4>Heading 4</H4>,
};

export const Heading5: StoryObj<typeof H5> = {
  render: () => <H5>Heading 5</H5>,
};

export const Heading6: StoryObj<typeof H6> = {
  render: () => <H6>Heading 6</H6>,
};

export const AllHeadings: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading sizes displayed together for comparison.',
      },
    },
  },
};

// Export headings meta separately
export const HeadingsMeta = headingMeta;