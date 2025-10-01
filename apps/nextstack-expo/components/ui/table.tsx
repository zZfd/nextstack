import * as TablePrimitive from '@rn-primitives/table';
import * as React from 'react';
import { View } from 'react-native';

import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

const Table = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Root>
>(({ className, ...props }, ref) => (
  <View className='relative w-full overflow-hidden'>
    <TablePrimitive.Root
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </View>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Header>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Header
    ref={ref}
    className={cn('[&_tr]:border-b', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Body>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Body>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Body
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Footer>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Footer>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Footer
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Row>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Row>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Row
    ref={ref}
    className={cn(
      'border-b transition-colors web:hover:bg-muted/50 web:data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Head>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Head>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn('font-medium text-muted-foreground', className)}
  >
    <TablePrimitive.Head
      ref={ref}
      className='h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0'
      {...props}
    />
  </TextClassContext.Provider>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Cell>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Cell>
>(({ className, ...props }, ref) => (
  <TablePrimitive.Cell
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn('text-sm text-muted-foreground', className)}
  >
    <View ref={ref} className='mt-4' {...props} />
  </TextClassContext.Provider>
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
