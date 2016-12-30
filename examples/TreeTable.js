import React, {Component, PropTypes} from 'react';
import {Table, Column, Cell, HeaderCell} from '../src/otable';
import StatesCell from './StatesCell';

const datas = [
  {
    modulename: '主页',
    permission: 'ENABLED',
    children: [
      {modulename: '主视图',permission: 'ENABLED',descriptions: '主视图展示'},
      {modulename: '变电站详情',permission: 'ENABLED',descriptions: '显示变电站信息'}
    ]
  },
  {
    modulename: '基础信息管理',
    permission: 'ENABLED',
    children: [
      {modulename: '变电站管理',permission: 'ENABLED',descriptions: '变电站信息管理',
        children: [
          {modulename: '站点信息',permission: 'ENABLED'},
          {modulename: '线路信息',permission: 'ENABLED'},
          {modulename: '电厂信息',permission: 'ENABLED'},
          {modulename: '计量点信息',permission: 'ENABLED'},
          {modulename: '计量小室信息',permission: 'ENABLED'}
        ]
      },
      {modulename: '设备管理',permission: 'ENABLED',descriptions: '电能表管理'},
      {modulename: '数据通信装纸',permission: 'ENABLED',descriptions: '显示当前数据通信装置'}
    ]
  },
  {
    modulename: '状态监控',
    permission: 'ENABLED',
    children: [
      {modulename: '状态监控',permission: 'ENABLED',descriptions: '对全国上网电量，计量器具可靠性分析，损耗监控，综合误差分析进行图表显示。'}
    ]
  },
  {
    modulename: '在线监测',
    permission: 'ENABLED',
    children: [
      {modulename: '在线抄表',permission: 'ENABLED',descriptions: '显示抄表侧交流模拟量，电能量的当前和历史数据以及电能表事件信息。'},
      {modulename: '在线检测',permission: 'ENABLED',descriptions: '示线路侧二次回路当前和历史数据。'}
    ]
  },
  {
    modulename: '账号管理',
    permission: 'ENABLED',
    children: [
      {modulename: '账号管理',permission: 'ENABLED',descriptions: '对登陆用户个人信息进行维护。'}
    ]
  }
];

class TreeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: datas
    };
  }

  render() {
    const {data} = this.state;
    return (
      <div>
        <Table height={400} data={data} isTree expand>
          <Column width={300} >
            <HeaderCell>模块</HeaderCell>
            <Cell dataKey="modulename" />
          </Column>
          <Column width={100} >
            <HeaderCell>权限</HeaderCell>
            <StatesCell dataKey="permission" />
          </Column>
          <Column width={600} >
            <HeaderCell>描述</HeaderCell>
            <Cell dataKey="descriptions" />
          </Column>
        </Table>
      </div>
    );
  }
}

TreeTable.propTypes = {

};

export default TreeTable;
