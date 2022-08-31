import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

// Libhoney is the Honeycomb SDK for sending telemetry Events to Honeycomb's API
// Docs for Libhoney live at https://docs.honeycomb.io/getting-data-in/javascript/libhoney/
// Here's our Honeycomb SDK configuration
import Libhoney from "libhoney"; 

let hny = new Libhoney({
  writeKey: "YOUR_API_KEY",
  dataset: "snapshop-app-events"
});

// Let's send an event each time the app starts up
let ev = hny.newEvent();
ev.addField("event_type", "startup");
// Uncomment this line to add a user agent field to your Events
// ev.addField("user_agent", typeof window && window.navigator && window.navigator.userAgent );
ev.send();

// And here's our actual app code:
class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <PhotoContextProvider>
        <HashRouter basename="/SnapScout">
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/mountain" />}
              />

              <Route
                path="/mountain"
                render={() => <Item searchTerm="mountain" />}
              />
              <Route path="/beach" render={() => <Item searchTerm="beach" />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" />} />
              <Route path="/food" render={() => <Item searchTerm="food" />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
      </PhotoContextProvider>
    );
  }
}

export default App;
