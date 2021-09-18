import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Dashboard from '../../pages/dashboard';

import Header from '../Header';
import s from './Layout.module.scss';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };


  render() {
    return (
      <div
        className={[
          s.root,
          'sidebar-' + this.props.sidebarPosition,
          'sidebar-' + this.props.sidebarVisibility,
        ].join(' ')}
      >
        <div className={s.wrap}>
          <Header />
          <main className={s.content}>
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.key}
                classNames="fade"
                timeout={200}
              >
                <Switch>
                  <Route path="/app/main" exact render={() => <Redirect to="/app/main/dashboard" />} />
                  <Route path="/app/main/dashboard" exact component={Dashboard} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </main>
        </div>
      </div >
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
