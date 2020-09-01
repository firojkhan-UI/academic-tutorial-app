import React, { useState } from 'react';
import './App.css';
import HeaderBody from './headerBody';
import SideBar from './sideBar';
import DisplayView from './displayView';

const App = props => {
  const [state, setState] = useState({
    tableData: [],
    currentIndex: 0,
    currentObjective: 0,
  })
  const _hadleTableData = index => {
    setState({
      ...state,
      currentIndex: index
    })
  }

  const onVideoLinkClick = index => {
    setState({
      ...state,
      currentObjective: index
    })
  }

  return (
    <React.Fragment>
      <HeaderBody
        onLessonClick={_hadleTableData}
        currentIndex={state.currentIndex}
      />
      <div style={{ display: 'flex' }}>
        <SideBar index={state.currentIndex} onVideoLinkClick={onVideoLinkClick} />
        <DisplayView currentLesson={state.currentIndex} currentObjective={state.currentObjective} />
      </div>
    </React.Fragment>
  );
}
export default App;
