// PaperEntry.tsx

import './PaperEntry.css'

interface PaperEntryProperty {
  author: string,
  title: string,
  booktitle: string,
  year: string,
  thumbnail: string,
  src: string
}

const PaperEntry: React.FC<PaperEntryProperty> = (item) => {

  const authorList = item.author.split(", ");
  return (
    <div className="row">
      <div className="paper-icon gray-filter col-sm-3">
        <img className="colorable" src={item.thumbnail} onClick={() => {window.open(item.src, '_blank')}} />
      </div>
      <div className="col-sm-9">								
        <div className="paper-author">
          { 
            authorList.map((name, index) => {
              const delim = (index < authorList.length - 1) ? ", " : "";
              if (name.toLowerCase() == 'chiu-wai yan') {
                return <span key={index} className="bold ag-blue">{name + delim}</span>
              }
              return <span key={index}>{name + delim}</span>;
            })
          }
        </div>
        <div className="paper-name">{item.title}</div>
        <div className="paper-type">{item.booktitle} ({item.year})</div>
      </div>
    </div>
  );
}

export default PaperEntry;