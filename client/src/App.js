import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// ApolloProvider provide data for all the components.
// ApolloClient , intializes connection to the GraphQL API server.
// InMemoryCache caches API response data to perform requests.
// createHttpLink control Apollo client requests. Kind of like middleware for outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache,  createHttpLink} from '@apollo/client';

// Connect to back-end server /graphql.
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create connection to API end point via above link.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// App will interact with above client instance.
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
