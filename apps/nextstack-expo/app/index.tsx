import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
} from '@/components/ui';
import '@/global.css';

export default function HomePage() {
  const [checked, setChecked] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [selectValue, setSelectValue] = React.useState<{
    value: string;
    label: string;
  }>();
  const [sliderValue, setSliderValue] = React.useState(50);
  const [progressValue] = React.useState(60);
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='flex-1 p-6 gap-8 pb-20'>
        <View className='absolute top-12 right-6 z-10'>
          <ThemeToggle />
        </View>

        {/* Header */}
        <View className='gap-2 mt-12'>
          <Text className='text-4xl font-bold text-foreground'>
            UI Components Demo
          </Text>
          <Text className='text-lg text-muted-foreground'>
            All 20 shadcn/ui components for React Native
          </Text>
        </View>

        <Separator />

        {/* Form Components Section */}
        <View className='gap-6'>
          <Text className='text-2xl font-bold text-foreground'>
            Form Components
          </Text>

          {/* Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Checkbox</Text>
              </CardTitle>
              <CardDescription>
                <Text>Select one or multiple options</Text>
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4'>
              <View className='flex-row items-center gap-2'>
                <Checkbox checked={checked} onCheckedChange={setChecked} />
                <Label onPress={() => setChecked(!checked)}>
                  <Text>Accept terms and conditions</Text>
                </Label>
              </View>
            </CardContent>
          </Card>

          {/* Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Radio Group</Text>
              </CardTitle>
              <CardDescription>
                <Text>Select a single option from a list</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <View className='flex-row items-center gap-2'>
                  <RadioGroupItem value='option1' />
                  <Label>
                    <Text>Option 1</Text>
                  </Label>
                </View>
                <View className='flex-row items-center gap-2'>
                  <RadioGroupItem value='option2' />
                  <Label>
                    <Text>Option 2</Text>
                  </Label>
                </View>
                <View className='flex-row items-center gap-2'>
                  <RadioGroupItem value='option3' />
                  <Label>
                    <Text>Option 3</Text>
                  </Label>
                </View>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Select</Text>
              </CardTitle>
              <CardDescription>
                <Text>Choose from a dropdown list</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a fruit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='apple' label='Apple' />
                  <SelectItem value='banana' label='Banana' />
                  <SelectItem value='orange' label='Orange' />
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Switch */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Switch</Text>
              </CardTitle>
              <CardDescription>
                <Text>Toggle between on and off states</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className='flex-row items-center justify-between'>
                <Label>
                  <Text>Enable notifications</Text>
                </Label>
                <Switch
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
              </View>
            </CardContent>
          </Card>

          {/* Input & Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Input & Textarea</Text>
              </CardTitle>
              <CardDescription>
                <Text>Text input fields</Text>
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4'>
              <View className='gap-2'>
                <Label>
                  <Text>Email</Text>
                </Label>
                <Input placeholder='Enter your email' />
              </View>
              <View className='gap-2'>
                <Label>
                  <Text>Message</Text>
                </Label>
                <Textarea placeholder='Type your message...' />
              </View>
            </CardContent>
          </Card>

          {/* Slider */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Slider</Text>
              </CardTitle>
              <CardDescription>
                <Text>Value: {sliderValue}</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Slider
                value={sliderValue}
                onValueChange={value => setSliderValue(value[0])}
                max={100}
                step={1}
              />
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Progress</Text>
              </CardTitle>
              <CardDescription>
                <Text>{progressValue}% complete</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressValue} max={100} />
            </CardContent>
          </Card>
        </View>

        <Separator />

        {/* Feedback & Overlay Components */}
        <View className='gap-6'>
          <Text className='text-2xl font-bold text-foreground'>
            Feedback & Overlays
          </Text>

          {/* Alert */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Alert</Text>
              </CardTitle>
            </CardHeader>
            <CardContent className='gap-4'>
              <Alert variant='default'>
                <AlertTitle>
                  <Text>Heads up!</Text>
                </AlertTitle>
                <AlertDescription>
                  <Text>You can add components to your app using the CLI.</Text>
                </AlertDescription>
              </Alert>
              <Alert variant='destructive'>
                <AlertTitle>
                  <Text>Error</Text>
                </AlertTitle>
                <AlertDescription>
                  <Text>Your session has expired. Please log in again.</Text>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

        </View>

        <Separator />

        {/* Layout & Display Components */}
        <View className='gap-6'>
          <Text className='text-2xl font-bold text-foreground'>
            Layout & Display
          </Text>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Accordion</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>
                    <Text>Is it accessible?</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>
                    <Text>Is it styled?</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>
                      Yes. It comes with default styles that match your design
                      system.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Avatar</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View className='flex-row gap-4'>
                <Avatar alt='User avatar'>
                  <AvatarImage
                    source={{ uri: 'https://github.com/shadcn.png' }}
                  />
                  <AvatarFallback>
                    <Text>CN</Text>
                  </AvatarFallback>
                </Avatar>
                <Avatar alt='Avatar fallback'>
                  <AvatarFallback>
                    <Text>AB</Text>
                  </AvatarFallback>
                </Avatar>
                <Avatar alt='Large avatar' className='h-16 w-16'>
                  <AvatarFallback>
                    <Text>LG</Text>
                  </AvatarFallback>
                </Avatar>
              </View>
            </CardContent>
          </Card>

          {/* Badge */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Badge</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View className='flex-row flex-wrap gap-2'>
                <Badge variant='default'>
                  <Text>Default</Text>
                </Badge>
                <Badge variant='secondary'>
                  <Text>Secondary</Text>
                </Badge>
                <Badge variant='destructive'>
                  <Text>Destructive</Text>
                </Badge>
                <Badge variant='outline'>
                  <Text>Outline</Text>
                </Badge>
              </View>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Skeleton</Text>
              </CardTitle>
              <CardDescription>
                <Text>Loading placeholders</Text>
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-3'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Table</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Text>Name</Text>
                    </TableHead>
                    <TableHead>
                      <Text>Status</Text>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Text>Item 1</Text>
                    </TableCell>
                    <TableCell>
                      <Text>Active</Text>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Text>Item 2</Text>
                    </TableCell>
                    <TableCell>
                      <Text>Pending</Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Collapsible */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>Collapsible</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={collapsibleOpen}
                onOpenChange={setCollapsibleOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant='outline'>
                    <Text>{collapsibleOpen ? 'Hide' : 'Show'} Details</Text>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-4'>
                  <Text className='text-sm text-muted-foreground'>
                    This is the collapsible content that can be toggled on and
                    off.
                  </Text>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
