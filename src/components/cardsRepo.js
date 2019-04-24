import React from 'react'

const CardsRepos = ({ cardRepos }) => cardRepos.map( value => (
  <div className="cards-items" key={value.id}>
    <span>
      <a 
        className="cards-link"
        href={value.html_url}
        alt="git repos"
        children={value.name}
        target="framename"
      />
    </span>
    
    <p style={{ fontSize: "12px"}} children={value.description}/>

    <div className="cards-footer">
      <span className="card-first-footer">
        <div className={value.language}/>
        {value.language}
      </span>
      <span
        className="card-after-footer">
          { new Date(Date.parse(value.updated_at)).toDateString() }
      </span>
    </div>
  </div>
))

export default CardsRepos