import React, {Component} from 'react';
import RayTable from './../../src/rctable';
import './../../src/rctable/style/index.css';

const permissionRender = (text) => <span><input type="checkbox" className="common-checkbox" />r/w</span>;

const firstColRender = (text) => <span><input type="checkbox" className="common-checkbox" />{text}</span>;

const columns = [
  {title: '模块名称', dataIndex: 'modulename', key: 'modulename', width: 200,
  render: (text) => firstColRender(text)},
  {title: '可写权限', dataIndex: 'permission', key: 'permission', width: 100,
  render: (text) => permissionRender(text),
  onCellClick: (record, e) => {console.log('Click cell', record, e.target);}},
  {title: '描述', dataIndex: 'descriptions', key: 'descriptions', width: 400}
];

const datas = [
  {
    key: 'mainpage',
    modulename: '主页',
    permission: 'ENABLED',
    children: [
      {key: 'mainpage-1', modulename: '主视图',permission: 'ENABLED',descriptions: '主视图展示'},
      {key: 'mainpage-2', modulename: '变电站详情',permission: 'ENABLED',descriptions: '显示变电站信息'}
    ]
  },
  {
    key: 'basic',
    modulename: '基础信息管理',
    permission: 'ENABLED',
    children: [
      {key: 'basic-sub', modulename: '变电站管理',permission: 'ENABLED',descriptions: '变电站信息管理',
        children: [
          {key: 'basic-sub-1', modulename: '站点信息',permission: 'ENABLED'},
          {key: 'basic-sub-2', modulename: '线路信息',permission: 'ENABLED'},
          {key: 'basic-sub-3', modulename: '电厂信息',permission: 'ENABLED'},
          {key: 'basic-sub-4', modulename: '计量点信息',permission: 'ENABLED'},
          {key: 'basic-sub-5', modulename: '计量小室信息',permission: 'ENABLED'}
        ]
      },
      {key: 'basic-dev', modulename: '设备管理',permission: 'ENABLED',descriptions: '电能表管理'},
      {key: 'basic-data', modulename: '数据通信装纸',permission: 'ENABLED',descriptions: '显示当前数据通信装置'}
    ]
  },
  {
    key: 'status',
    modulename: '状态监控',
    permission: 'ENABLED',
    children: [
      {key: 'status-1', modulename: '状态监控',permission: 'ENABLED',descriptions: '对全国上网电量，计量器具可靠性分析，损耗监控，综合误差分析进行图表显示。'}
    ]
  },
  {
    key: 'online',
    modulename: '在线监测',
    permission: 'ENABLED',
    children: [
      {key: 'online-1', modulename: '在线抄表',permission: 'ENABLED',descriptions: '显示抄表侧交流模拟量，电能量的当前和历史数据以及电能表事件信息。'},
      {key: 'online-2',modulename: '在线检测',permission: 'ENABLED',descriptions: '示线路侧二次回路当前和历史数据。'}
    ]
  },
  {
    key: 'account',
    modulename: '账号管理',
    permission: 'ENABLED',
    children: [
      {key: 'account-1', modulename: '账号管理',permission: 'ENABLED',descriptions: '对登陆用户个人信息进行维护。'}
    ]
  }
];

const onRowClick = (record, index, event) => {
  console.log(`Click nth(${index}) row of parent, record.name: ${record.name}`);
  // See https://facebook.github.io/react/docs/events.html for original click event details.
  if (event.shiftKey) {
    console.log('Shift + mouse click triggered.');
  }
};

const onRowDoubleClick = (record, index) => {
  console.log(`Double click nth(${index}) row of parent, record.name: ${record.name}`);
};

class RCTreeTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RayTable
        columns={columns}
        data={datas}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
      />
    );
  }
}

export default RCTreeTable;
