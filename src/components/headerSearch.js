import React, { Component } from 'react'

class HeaderSearch extends Component {
  render() {
    return (
      <div className="staticNav">
          <input className="searchInput" type="text" placeholder="Search User Github"/>
          <input type="button" onClick={this.props.handleSearch} value="Search"/>
      </div>
    )
  }
}

export default HeaderSearch;