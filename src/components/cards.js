import React from 'react'

const Cards = ({ name, description, href, language='Shell', updated_at}) => (
  <div className="cards-items">
    <span>
      <a 
        className="cards-link"
        href={href}
        alt="git repos"
        children={name}
        target="framename"
      />
    </span>
    
    <p style={{ fontSize: "12px"}} children={description}/>

    <div className="cards-footer">
      <span className="card-first-footer">
        <div className={language}/>
        {language}
      </span>
      <span
        className="card-after-footer">
          { new Date(Date.parse(updated_at)).toDateString() }
      </span>
    </div>
  </div>
)

export default Cards