import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal = ({ isOpen, onClose, children }: CustomModalProps): React.ReactNode => (
  <Modal size="4xl" onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalBody marginTop="1rem">{children}</ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Закрыть</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
