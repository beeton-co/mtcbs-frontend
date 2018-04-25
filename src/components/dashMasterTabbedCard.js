import React, { Component } from 'react';
import { Card } from 'antd';

import DashCard from './bettorDashCard';

const tabList = [{
    key: 'tab1',
    tab: 'Payoff',
}, {
    key: 'tab2',
    tab: 'Competition',
}];

const contentList = {
    tab1: <DashCard
            key="dash-card-1"
            startTime={new Date('2018-03-20T16:38:00').getTime()}
            endTime={new Date('2018-03-20T18:38:00').getTime()}
            {...this.props}
        />,
    tab2: <p>content2</p>,
};

class TabsCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 'tab1'
        }
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    title={this.props.title}
                    extra={<a href="#">More</a>}
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                    activeTabKey={this.state.key}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        );
    }
}

export default TabsCard;