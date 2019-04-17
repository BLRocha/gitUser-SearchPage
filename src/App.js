import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './App.css';
import perfil from './assets/mokPerfil';
import repos from './assets/mokRepos';
import starred from './assets/mokStarred';
import follower from './assets/mokFallowers';
import followin from './assets/mokFallowing';
import nav from './assets/dashboardMenu';

import User from './components/user';
import Ul from './components/nav';
import Cards from './components/cards';
import CardProfile from './components/cardProfile';

class App extends Component {
  constructor() {
    super()

    this.state = {
      btnName: nav,
      apiPerfil: perfil,
      apiRepos: repos,
      apiStarred: starred,
      apiFollowers: follower,
      apiFollowing: followin,
   
      repositories: true,
      starred: false,
      fallowers: false,
      following: false
    }
    this.handleRouter = this.handleRouter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(eventSearch) {
    if (eventSearch.target.nodeName === 'INPUT') {
    const $inpusSerach = document.querySelector('.searchInput').value;
    this.search($inpusSerach);
    }else{
      this.search(eventSearch.target.id);
    }
  }

  async search ($inpusSerach){
    try {
      const { data } = await axios.get(`https://api.github.com/users/${$inpusSerach}`);
      this.setState({apiPerfil: [data]})
      let [repos, starred, followers, following] = await Promise.all([
        axios.get(`https://api.github.com/users/${$inpusSerach}/repos`),
        axios.get(`https://api.github.com/users/${$inpusSerach}/starred`),
        axios.get(`https://api.github.com/users/${$inpusSerach}/followers`),
        axios.get(`https://api.github.com/users/${$inpusSerach}/following`),
      ]);
      this.setState({apiRepos: repos.data})
      this.setState({apiStarred: starred.data})
      this.setState({apiFollowers: followers.data})
      this.setState({apiFollowing: following.data})
    }catch(err) {
      console.log('Not found ', err)
    }
  }
  handleRouter(event) {
    switch (event.target.textContent) {
      case 'repositories':
        this.setState({repositories: true},
          () => this.setState(
            {
              starred: !this.state.repositories,
              fallowers: !this.state.repositories,
              following: !this.state.repositories
            }
          )
        );
        break;
      case 'starred':
        this.setState({starred: true},
          () => this.setState(
            {
              repositories: !this.state.starred,
              fallowers: !this.state.starred,
              following: !this.state.starred
            }
          )
        );
        break;
      case 'followers':
        this.setState({fallowers: true},
          () => this.setState(
            {
              repositories: !this.state.fallowers,
              starred: !this.state.fallowers,
              following: !this.state.fallowers
            }
          )
        );
        break;
      case 'following':
        this.setState({following: true},
          () => this.setState(
            {
              repositories: !this.state.following,
              starred: !this.state.following,
              fallowers: !this.state.following
            }
          )
        );
        break;
      default:
        break;
    }
  }

  
  render() {
    return (
      <Fragment>
        <div className="staticNav">
            <input className="searchInput" type="text" placeholder="Search User Github"/>
            <input type="button" onClick={this.handleSearch} value="Search"/>
        </div>

        <div className="mainContainer">
          
          {
            this.state.apiPerfil.map(user => ( 
                <User
                  key={user.id}
                  avatar_url={user.avatar_url}
                  name={user.name}
                  html_url={user.html_url}
                  public_repos={user.public_repos}
                  followers={user.followers}
                  following={user.following}
                />
              )
            )
          }

          <div className="dashboard">
            <nav className="dashboard-nav" >
              <ul className="dashboard-nav-ul">
                {
                  this.state.btnName.map(
                    (value, i) => (
                      <Ul
                        key={value}
                        checked={this.state[value]}
                        handler={this.handleRouter}
                        btnName={value}/>
                    )
                  )
                }
              </ul>
            </nav>

            <hr />

            <div className="main-cards">
              { // REPOSITORIES
               !!this.state.repositories && this.state.apiRepos.map(
                  value => (
                    <Cards
                      key={value.id}
                      name={value.name}
                      description={value.description}
                      href={value.html_url}
                      language={value.language}
                      updated_at={value.updated_at}
                    />
                  )
                )
              }
              { // STARRED
                !!this.state.starred && this.state.apiStarred.map(
                  value => (
                    <Cards
                      key={value.id}
                      name={value.name}
                      description={value.description}
                      href={value.html_url}
                      language={value.language}
                      updated_at={value.updated_at}
                    />
                  )
                )
                // END Repositore and starreds
              }

              { // FALLOWERS
                !!this.state.fallowers && this.state.apiFollowers.map(
                  value => (
                    <CardProfile
                      key={value.id}
                      login={value.login}
                      avatar_url={value.avatar_url}
                      html_url={value.html_url}
                      handleSearch={this.handleSearch}
                    /> 
                  )
                )
              }
              { // FOLLOWING
                !!this.state.following && this.state.apiFollowing.map(
                  value => (
                    <CardProfile
                      key={value.id}
                      login={value.login}
                      avatar_url={value.avatar_url}
                      html_url={value.html_url}
                      handleSearch={this.handleSearch}
                    /> 
                  )
                )
              }
            </div>
          </div>

        </div>
      </Fragment>
    );
  }
}

export default App;
