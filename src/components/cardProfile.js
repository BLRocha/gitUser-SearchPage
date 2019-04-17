import React from 'react'

const cardProfile = ({ login, html_url, avatar_url, handleSearch}) => (
  <div className="main-Profile">
    <div className="profile-itens">
      <img id={login} src={avatar_url} onClick={handleSearch} alt={`Foto do perfil do usuario ${login}`}/>
      <a href={html_url} target="framename" children={login} />
    </div>
  </div>
)

export default cardProfile