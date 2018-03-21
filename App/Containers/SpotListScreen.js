import { connect } from 'react-redux'
import CardList from '../Components/SpotCards/CardList'

const dispatchToProps = dispatch => ({})

const mapStateToProps = state => ({ location: state.location })

export default connect(mapStateToProps, dispatchToProps)(CardList)
