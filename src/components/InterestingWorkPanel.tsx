// InterestingWorkPanel.tsx

import React from "react";

interface PanelProperty {
  title: string,
  preText: string,
  Component: React.FC<any>,
  postText: string,
}

const InterestingWorkPanel = (item: PanelProperty) => {

  const postTextList = item.postText.split(/<br\s*\/?>/)

  return (
    <div className="row justify-content-center iw-panel">
      <div className="bordered col-12 col-md-12">
        <h4>{item.title}</h4>
        <hr/>
        <p>{item.preText}</p>
        <item.Component />
        <p style={{marginTop: "1em"}}>
          {postTextList.map((text, index) => (
            <span style={{display: "block"}} key={index}>{text}</span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default InterestingWorkPanel;
