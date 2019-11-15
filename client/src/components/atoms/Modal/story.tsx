import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import Scrollbar from 'react-perfect-scrollbar';

import Modal from '.';
import { Button, Title } from '..';
import { Center, FlexColumnCenter } from '../../layouts';

storiesOf('Modal', module).add('modal', () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(event => setShowModal(true), []);
  const closeModal = useCallback(event => setShowModal(false), []);

  return (
    <div>
      <Center>
        <FlexColumnCenter>
          <Title marginBottom>Modal Example</Title>
          <Button onClick={openModal}>Show Modal</Button>
        </FlexColumnCenter>
      </Center>
      <Modal open={showModal} onClose={closeModal}>
        <Scrollbar>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </div>
        </Scrollbar>
      </Modal>
    </div>
  );
});
