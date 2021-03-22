import React from 'react';
import {
  Container,
  ContentContainer,
  ContainerHeader,
  ContainerDetail,
  ContainerFooter,
  TextHeader,
  ButtonModal
} from './styles';

interface IModalProps {
  textHeader?: string;
  openModal: boolean;
  loadingSave?: boolean;
  onCloseModal(): void;
  onSaveModal(): void;
}

const Modal: React.FC<IModalProps> = ({
  textHeader,
  openModal,
  onCloseModal,
  onSaveModal,
  loadingSave,
  children
}) => {
  const handleSaveModal = async () => {
    await onSaveModal();
  }

  return (
    <Container openModal={openModal}>
      <ContentContainer>
        <ContainerHeader>
          <TextHeader>
            {textHeader ? textHeader : 'Detalhe'}
          </TextHeader>
        </ContainerHeader>
        <ContainerDetail>
          {children}
        </ContainerDetail>
        <ContainerFooter>
          <ButtonModal isTransparent={true} onClick={onCloseModal}>Cancelar</ButtonModal>
          <ButtonModal loading={loadingSave} onClick={handleSaveModal}>Salvar</ButtonModal>
        </ContainerFooter>
      </ContentContainer>
    </Container>
  )
}

export default Modal;