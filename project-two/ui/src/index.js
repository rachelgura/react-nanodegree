import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import { sagas } from './actions';
import reducers from './reducers';
import App from './components/App';
import Nav from './components/layout/NavContainer';
import Posts from './components/posts/PostsContainer';
import New from './components/posts/NewContainer';
import DetailView from './components/posts/DetailViewContainer';
import AddComment from './components/posts/AddCommentContainer';
import EditPost from './components/posts/EditPostContainer';
import EditComment from './components/posts/EditCommentContainer';
import Landing from './components/landing';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Nav />
        <App>
          <Switch>
            <Route exact path="/" component={Landing} />

            <Route exact path="/new" component={New} />
            <Route exact path="/:category" component={Posts} />
            <Route exact path="/:category/:id/new" component={AddComment} />
            <Route exact path="/:category/:id/edit" component={EditPost} />
            <Route exact path="/:category/:id" component={DetailView} />

            <Route
              exact
              path="/posts/:postid/comments/:commentid"
              component={EditComment}
            />
          </Switch>
        </App>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
