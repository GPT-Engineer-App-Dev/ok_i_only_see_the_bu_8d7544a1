import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };
  const toast = useToast();

  //... rest of the existing handleColorChange and handleInputChange functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onOpen();
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      <Container maxW="container.md" py={10}>
        {isPreview ? (
          <VStack spacing={4} align="stretch" mt={4}>
            <Box>Sample Type: {form.sampleType}</Box>
            <Box>Selected Colors: {form.colors.join(", ")}</Box>
            <Box>Contact Name: {form.name}</Box>
            <Box>Email: {form.email}</Box>
            <Box>Phone: {form.phone}</Box>
            <Box>Company Name: {form.companyName}</Box>
            <Box>Line Speed: {form.lineSpeed}</Box>
            <Box>Print Size: {form.printSize}</Box>
            <Button colorScheme="blue" onClick={handleEdit}>
              Back to Edit
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm and Submit
            </Button>
          </VStack>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel>Sample Type</FormLabel>
              <Select placeholder="Select sample type" value={form.sampleType} onChange={(e) => setForm({ ...form, sampleType: e.target.value })}>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Colors</FormLabel>
              <CheckboxGroup colorScheme="green" value={form.colors} onChange={(values) => setForm({ ...form, colors: values })}>
                <Stack spacing={10} direction="row">
                  <Checkbox value="Red">Red</Checkbox>
                  <Checkbox value="Blue">Blue</Checkbox>
                  <Checkbox value="Green">Green</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" placeholder="Your phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input placeholder="Your company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Line Speed</FormLabel>
              <Input placeholder="Line speed in m/min" value={form.lineSpeed} onChange={(e) => setForm({ ...form, lineSpeed: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Print Size</FormLabel>
              <Input placeholder="Print size in mm" value={form.printSize} onChange={(e) => setForm({ ...form, printSize: e.target.value })} />
            </FormControl>
            <Button colorScheme="blue" onClick={handlePreview}>
              Preview
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
