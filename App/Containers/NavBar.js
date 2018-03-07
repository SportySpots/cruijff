import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import NavBar from '../Components/NavBar'

const mapDispatchToProps = {
  navigate: NavigationActions.navigate
}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
