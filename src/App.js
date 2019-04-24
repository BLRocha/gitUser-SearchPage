import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './App.css';
import perfil from './assets/mokPerfil';
import repos from './assets/mokRepos';
import starred from './assets/mokStarred';
import follower from './assets/mokFallowers';
import followin from './assets/mokFallowing';
import nav from './assets/dashboardMenu';

import HeaderSearch from './components/headerSearch';
import User from './components/user';
import Ul from './components/nav';
import CardsRepo from './components/cardsRepo';
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
      followers: false,
      following: false
    }
    this.handleRouter = this.handleRouter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(eventSearch) {
    console.log('click')
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
              followers: !this.state.repositories,
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
              followers: !this.state.starred,
              following: !this.state.starred
            }
          )
        );
        break;
      case 'followers':
        this.setState({followers: true},
          () => this.setState(
            {
              repositories: !this.state.followers,
              starred: !this.state.followers,
              following: !this.state.followers
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
              followers: !this.state.following
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
        <HeaderSearch handleSearch={this.handleSearch}/>

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
               !!this.state.repositories && <CardsRepo
                  cardRepos={this.state.apiRepos}
                />
              }
              { // STARRED
                !!this.state.starred && <CardsRepo
                  cardRepos={this.state.apiStarred}
                />
                // END Repositore and starreds
              }

              { // FALLOWERS
                !!this.state.followers && <CardProfile
                  cardProfile={this.state.apiFollowers}
                  handleSearch={this.handleSearch}
                />
              }
              { // FOLLOWING
                !!this.state.following && <CardProfile
                  cardProfile={this.state.apiFollowing}
                  handleSearch={this.handleSearch}
                />
              }
            </div>
          </div>

        </div>
      </Fragment>
    );
  }
}

export default App;
