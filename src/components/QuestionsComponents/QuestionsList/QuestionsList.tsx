import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import uniqid from 'uniqid';

import { faCommentAlt, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { defaultPageNumber } from '../../../utils/config/apiEndPoints';
import { createMarkup, sanitize } from '../../../utils/helperFunctions';
import { ModalQuestionProps, QuestionProps } from '../../../utils/types';
import useQuestionsList from '../../../utils/useHooks/useQuestionsList';

import Alert from '../../Shared/Alert/Alert';
import Button from '../../Shared/Button/Button';
import Chip from '../../Shared/Chip/Chip';
import Loading from '../../Shared/Loading/Loading';
import QuestionModal from '../QuestionModal/QuestionModal';

import './QuestionsList.scss';

interface SingleQuestionProps {
  handleQuestionSelect: (question: QuestionProps) => void;
  question: QuestionProps;
  lastQuestionInPage?: React.LegacyRef<HTMLLIElement> | undefined | any;
  toggleModal: () => void;
}

const QuestionsList: React.FC = () => {
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const [question, setQuestion]: [ModalQuestionProps, Dispatch<SetStateAction<ModalQuestionProps>>] = useState({} as ModalQuestionProps);
  const [pageNumber, setPageNumber]: [number, Dispatch<SetStateAction<number>>] = useState(defaultPageNumber);

  const { loading, questions, error, hasMore } = useQuestionsList(pageNumber);
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * lastQuestionInPage will check if last question is visible in a screen or not after if data is available and loading is false.
   */
  const lastQuestionInPage = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        // we wanted to check the single element only
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },

    [loading, hasMore],
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionSelect = (question: QuestionProps): void => {
    setQuestion({
      title: question.title,
      link: question.link,
      body: question.body,
    });
  };

  if (error) {
    return <Alert error={error} />;
  }

  return (
    <>
      <ul className='questions_list'>
        <div className='questions_list__headings'>
          <h1>Stackoverflow&apos;s Questions</h1>
        </div>
        {/* 
          Instead of index we should use id which returns from the backend so React can identify each and every element as an unique.
          However, in stackoverflow's api provide `question_id` but it's not an unique, so I am using `index` here.
        */}
        {questions.map((question: QuestionProps, index: number) => {
          // If last element of an array is then add `lastQuestionInPage`
          if (questions.length === index + 1) {
            return (
              <SingleQuestion
                key={uniqid()}
                handleQuestionSelect={handleQuestionSelect}
                toggleModal={toggleModal}
                question={question}
                lastQuestionInPage={lastQuestionInPage}
              />
            );
          } else {
            return (
              <SingleQuestion key={uniqid()} handleQuestionSelect={handleQuestionSelect} toggleModal={toggleModal} question={question} />
            );
          }
        })}
        {loading && <Loading />}
      </ul>
      {isOpen && <QuestionModal isOpen={isOpen} question={question} toggleModal={toggleModal} />}
    </>
  );
};

export default QuestionsList;

const SingleQuestion: React.FC<SingleQuestionProps> = ({ handleQuestionSelect, question, lastQuestionInPage, toggleModal }) => {
  return (
    <li ref={lastQuestionInPage} className='question'>
      <div className='question_card d-flex'>
        <div className='question_card__summary'>
          <h3 className='question_card__summary__title'>
            <Button
              className='btn-link'
              onClick={() => {
                toggleModal();
                // Added content in a object of required details to show in a modal (popup).
                handleQuestionSelect(question);
              }}
              btnText={<span dangerouslySetInnerHTML={createMarkup(question?.title)} />}
            />
          </h3>
          <div className='question_card__summary__chips'>
            {question.tags.map(tag => (
              <Chip onClick={() => window.open(`https://stackoverflow.com/questions/tagged/${tag}`, '_blank')} title={tag} key={uniqid()} />
            ))}
          </div>
          <div className='d-flex'>
            <p className='question_card__summary__created_date'>{sanitize(new Date(question?.creation_date).toDateString())}</p>
            <p className='question_card__summary__author' dangerouslySetInnerHTML={createMarkup(question?.owner?.display_name)}></p>
          </div>
        </div>
        <div className='question_card__status'>
          <div className='question_card__status__votes'>
            <span className='count'>{sanitize(question.score + '')}</span>
            <span>votes</span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div className='question_card__status__answers'>
            <span className='count'>{sanitize(question.answer_count + '')}</span>
            <span>answers</span>
            <FontAwesomeIcon icon={faCommentAlt} />
          </div>
          <div className='question_card__status__views'>
            <span className='count'>{sanitize(question.view_count + '')}</span>
            <span>views</span>
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
      </div>
    </li>
  );
};
