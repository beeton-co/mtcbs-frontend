import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import * as sc from '../services/smartcontract';
const SubMenu = Menu.SubMenu;

class Header extends Component {

  state = {
    current: '1',
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  renderFAQs() {
    return (
            <SubMenu key="faqs" title={<span><Icon type="question-circle-o"/><span>FAQ</span></span>}>
              <Menu.Item className="nav-item" key="get-test-ether">
                <Link className="nav-link" to="/faq/getether">
                  Get Test Ether
                </Link>
              </Menu.Item>
              <Menu.Item className="nav-item" key="faq-claim-reward">
                <Link className="nav-link" to="/faq/claimreward">
                  Claim Reward
                </Link>
              </Menu.Item>
            </SubMenu>
    );
  }

  profileLinks(){
    return (<SubMenu key="profile" title={<span><Icon type="profile"/><span>My Profile</span></span>}>
      {/*<Menu.Item className="nav-item" key="my-bet-races">
        <Link className="nav-link" to="/profile/races">
          Bet Races
        </Link>
      </Menu.Item>*/}
      <Menu.Item className="nav-item" key="my-bets">
        <Link className="nav-link" to="/profile/bets">
          My Bets
        </Link>
      </Menu.Item>
      <Menu.Item className="nav-item" key="my-rewards">
        <Link className="nav-link" to="/profile/rewards">
          My Claimed Rewards
        </Link>
      </Menu.Item>
    </SubMenu>);
  }

  channelManagementLinks() {
    if (sc.smartcontract.user.channelOwner) {
      return (
              <SubMenu key="channelManagement" title={<span><Icon type="setting"/><span>Booth Management</span></span>}>
                <Menu.Item className="nav-item" key="create-race">
                  <Link className="nav-link" to="/profile/cmgmt/createrace">
                    Create Race
                  </Link>
                </Menu.Item>
                <Menu.Item className="nav-item" key="cmgmt-races">
                  <Link className="nav-link" to="/profile/cmgmt/races">
                    My Races
                  </Link>
                </Menu.Item>
                <Menu.Item className="nav-item" key="cmgmt-payout">
                  <Link className="nav-link" to="/profile/cmgmt/payout">
                    My Payout
                  </Link>
                </Menu.Item>
              </SubMenu>
      );
    }
  }
  // these links can be conditional
  createChannel() {
    if (!sc.smartcontract.user.channelOwner) {
      return (
              <Menu.Item className="nav-item" key={3}>
                <Link className="nav-link" to="/createchannel">
                  <span><Icon type="form"/><span>Become a Booth Owner</span></span>
                </Link>
              </Menu.Item>
      );
    }
  }

  renderRaceLinks() {
    return (<SubMenu key="races" title={<span><Icon type="form"/><span>Races</span></span>}>
      <Menu.Item className="nav-item" key="races-betting">
        <Link className="nav-link" to="/races/betting">
          Open Betting
        </Link>
      </Menu.Item>
      <Menu.Item className="nav-item" key="races-running">
        <Link className="nav-link" to="/races/running">
          Running
        </Link>
      </Menu.Item>
      <Menu.Item className="nav-item" key="races-upcoming">
        <Link className="nav-link" to="/races/upcoming">
          Up Coming
        </Link>
      </Menu.Item>
      <Menu.Item className="nav-item" key="races-finished">
        <Link className="nav-link" to="/races/completed">
          Completed
        </Link>
      </Menu.Item>
      <Menu.Item className="nav-item" key="races-void">
        <Link className="nav-link" to="/races/void">
          Void
        </Link>
      </Menu.Item>
    </SubMenu>);
  }

  render() {
    return (
            <Menu onClick={this.handleClick} className="navbar" theme="dark" selectedKeys={[this.state.current]} style={{width: 256}} mode="inline">
              <Menu.Item className="nav-item" key={1}>
                <Link to="/" className="navbar-brand"><span><Icon type="home"/><span>Home</span></span></Link>
              </Menu.Item>
              {this.createChannel()}
              {this.channelManagementLinks()}
              {this.renderRaceLinks()}
              {this.profileLinks()}
              {this.renderFAQs()}
            </Menu>
    );
  }
}

export default Header;
