import React from 'react';

import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

import { createMarkup, sanitize } from '../../../utils/helperFunctions';
import { ModalQuestionProps } from '../../../utils/types';

import Button from '../../Shared/Button/Button';
import Modal from '../../Shared/Modal/Modal';

import './QuestionModal.scss';

interface QuestionModalProps {
  isOpen: boolean;
  question: ModalQuestionProps;
  toggleModal: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, isOpen, toggleModal }) => {
  const handleRedirect = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <Modal
      show={isOpen}
      onClose={toggleModal}
      title={<h3 dangerouslySetInnerHTML={createMarkup(question.title)}></h3>}
      footerContent={
        <Button
          icon={faExternalLinkSquareAlt}
          className='btn-link'
          onClick={() => handleRedirect(sanitize(question.link))}
          btnText={`Go to Question`}
        />
      }
    >
      <div className='question_modal__body'>
        <div dangerouslySetInnerHTML={{ __html: sanitize(question.body) }}></div>
      </div>
    </Modal>
  );
};
export default QuestionModal;
