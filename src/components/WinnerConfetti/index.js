import PropTypes from 'prop-types'
import React from 'react'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'

export const WinnerConfetti = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Winner extends React.PureComponent {

  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      recycle: PropTypes.bool,
    }),
  };

  render() {
    console.log(this.props);
    return (
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
              <Confetti {...this.props.size} recycle={this.props.recycle} numberOfPieces={1500}/>
            </div>
    )
  }
});