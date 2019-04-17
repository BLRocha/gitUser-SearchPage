import React from 'react'

const User = ({ avatar_url, html_url, name, public_repos, followers, following }) => (
  <div className="user-info">
    <img className="avatar" src={avatar_url} alt="avatar" />
    <div className="repoState">
      <span className="repoState-itens repos" children={public_repos} />
      <span className="repoState-itens followers" children={followers} />
      <span className="repoState-itens following" children={following} />
    </div>
    <a className="user-name-link" target="framename" href={html_url} alt="github">{name}</a>
  </div>
)

export default User