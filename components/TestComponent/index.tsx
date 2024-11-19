import { Flex, Text, Button } from "@radix-ui/themes";

export default function TestComponent() {
  return (
    <Flex direction="column" gap="4" width="250px">
      <Text>Hello from Radix Themes :)</Text>
      <Button className="w-20">Let&apos;s go</Button>
    </Flex>
  );
}

// variant="classic" color="orange" size="1"
