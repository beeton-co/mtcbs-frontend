import PropTypes from 'prop-types'
import React from 'react'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'

export default WinnerConfetti = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Winner extends React.PureComponent {

  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  };

  render() {
    return (
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
              <Confetti {...this.props.size} />
            </div>
    )
  }
});