import React from 'react'

const CardProfile = ({ cardProfile, handleSearch }) => cardProfile.map(value => (
    <div className="main-Profile" key={value.id}>
      <div className="profile-itens">
        <img style={{ border: '3px solid #33aad894' }}
          id={value.login}
          src={value.avatar_url}
          onClick={handleSearch}
          alt={`Foto do perfil do usuario ${value.login}`}
        />
        <a
          href={value.html_url}
          target="framename"
          children={value.login}
        />
      </div>
    </div>
  )
)


export default CardProfile