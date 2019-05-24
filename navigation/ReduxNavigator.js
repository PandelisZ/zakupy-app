import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator';


// here is our redux-aware our smart component
function ReduxNavigator (props) {
  const { dispatch, nav } = props

  return <AppNavigator navigation={{
      dispatch,
      state: nav,
      addListener
    }} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigator)
