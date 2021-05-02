import React from 'react';
import { Helmet } from 'react-helmet';

import ScrollTop from '../../components/Shared/ScrollTop/ScrollTop';
import QuestionsList from '../../components/QuestionsComponents/QuestionsList/QuestionsList';

import '../../assets/styles/global.scss';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Stackoverflow&apos;s Questions | Questions List</title>
      </Helmet>
      <div className='container'>
        <QuestionsList />
        <ScrollTop />
      </div>
    </>
  );
};

export default App;
