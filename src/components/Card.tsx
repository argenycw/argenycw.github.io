// Card.tsx

import "./Card.css"

interface CardProperty {
    src: string, // src of the img
    width?: string,
    title: string,
    description: string,
    path: string, // path of the page to be opened
    disabled?: boolean;
    playable?: boolean;
}

const Card = (item: CardProperty) => {

  return (
    <div className="col col-auto m-auto">
      <div className="card d-flex align-items-center" style={{width: item.width ?? "18rem"}}>
        <div className="mx-3 img-container">
          <img src={item.src} className="img-fluid object-fit-contain" alt={item.title} />
        </div>        
        <div className="card-body">
          <div className="card-title">
            <a href={item.path} target={(item.path && item.path!="#") ? "_blank" : "_self"}>{item.title}</a>
          </div>
          <p className="card-text">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;