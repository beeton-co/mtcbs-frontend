// import React, {Component} from 'react';
// import { Select } from 'antd';
//
// const Option = Select.Option;
//
// const children = [];
//
// const coins =[
//     { value: 'ETH', label: 'Ethereum'},
//     { value: 'LTC', label: 'Litecoin'}
// ]
//
// for (let i = 0; i < coins.length; i++) {
//     children.push(<Option value={coins[i].value} key={coins[i].label}>{coins[i].label}</Option>);
// }
//
// function handleChange(value) {
//     console.log(`selected ${value}`);
// }
//
// const CoinSelect = ({input}) => (
//     <Select
//         mode="multiple"
//         style={{ width: '100%' }}
//         placeholder="Please select"
//         defaultValue={[]}
//         onChange={handleChange}
//     >
//         {children}
//     </Select>
// );
//
// export default CoinSelect;


//
//     class CoinSelect extends Component {
//         constructor(props) {
//             super(props);
//
//             this.state = {
//                 value: this.props.defValue,
//                 extData: this.props.data
//             }
//
//             this._create = this._create.bind(this);
//         }
//
//         _create(name) {
//             var tag = { name, id: this.state.extData.length + 100 + 1 }
//
//             var value = this.state.value.concat(tag)
//             var extData = this.state.extData.concat(tag)
//
//             this.setState({
//                 extData,
//                 value
//             })
//         }
//
//         componentDidUpdate() {
//             let { onChange } = this.props.input
//             onChange(this.state.value)
//         }
//
//         handleOnChange(value) {
//             this.setState({ value })
//         }
//
//         render() {
//             const input = this.props.input
//             return (
//                 <Multiselect
//                     {...input}
//                     data={this.state.extData}
//                     onBlur={() => input.onBlur()}
//                     value={this.state.value || []}
//                     valueField="id"
//                     textField="name"
//                     onCreate={this._create}
//                     onChange={value => this.handleOnChange(value)}
//                 />
//             )
//         }
//     }
//
// export default CoinSelect;

