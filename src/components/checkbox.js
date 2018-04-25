import React, {Component} from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  };

  toggleCheckboxChange = () => {
    const {handleCheckboxChange} = this.props;

    this.setState(({isChecked}) => (
            {
              isChecked: !isChecked,
            }
    ));
    handleCheckboxChange(this.state.isChecked);
  };

  render() {
    const {label, id} = this.props;
    const {isChecked} = this.state;

    return (
            <div className="checkbox">
              <label>{label}</label>
              <input id={id} type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange}/>
            </div>
    );
  }
}

/*Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};*/

export default Checkbox;