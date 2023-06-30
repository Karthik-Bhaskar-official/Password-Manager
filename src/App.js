import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    listOfPassword: [],
    website: '',
    username: '',
    password: '',
    search: '',
    isShow: false,
  }

  submit = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      listOfPassword: [...prevState.listOfPassword, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      search: '',
    }))
  }

  website = event => {
    this.setState({website: event.target.value})
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  search = event => {
    this.setState({search: event.target.value})
  }

  checkBox = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {listOfPassword} = this.state
    const newList = listOfPassword.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({listOfPassword: newList, isTrue: caseOf})
  }

  render() {
    let {isTrue} = this.state

    const {
      listOfPassword,
      search,
      isShow,
      username,
      password,
      website,
    } = this.state

    const newList = listOfPassword.filter(each =>
      each.websiteName.toLowerCase().includes(search.toLowerCase()),
    )

    isTrue = newList.length !== 0

    return (
      <div className="bg-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager"
            />
            <form className="new-password-container" onSubmit={this.submit}>
              <h1 className="add">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="small-image"
                />

                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.website}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="small-image"
                />

                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.username}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="small-image"
                />

                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.password}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="passwords-container">
            <div className="search-container">
              <div className="con">
                <h1 className="password-name">Your Passwords</h1>
                <p className="span">{newList.length}</p>
              </div>
              <div className="searches-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />

                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.search}
                  value={search}
                />
              </div>
            </div>
            <hr />
            <div className="button-container">
              <div className="check-box-container">
                <input
                  type="checkbox"
                  id="check-box"
                  onChange={this.checkBox}
                />
                <label htmlFor="check-box" className="label">
                  Show Passwords
                </label>
              </div>
            </div>
            {!isTrue && (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-image "
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="result-container">
                {newList.map(eachValue => (
                  <li
                    className="item-list"
                    id={eachValue.id}
                    key={eachValue.id}
                  >
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div className="list-content">
                      <p className="website">{eachValue.websiteName}</p>
                      <p className="website">{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          className="stars-image"
                          alt="stars"
                        />
                      )}
                      {isShow && (
                        <p className="website">{eachValue.password}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={() => this.deleteItem(eachValue.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        className="del-image"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
