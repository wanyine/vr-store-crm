/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Panel, Row, Col, Dropdown, DropdownButton, DropdownMenu,MenuItem, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTimeField from 'react-bootstrap-datetimepicker'

import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import {actions as recordActions} from '../../reducers/record'
import RecordForm from './form'
import {records as recordsApi} from '../../core/api'

const options = {
  noDataText:'没有符合查询条件的记录'
}

const Page = props => (
   
  <Layout className={s.content}>
    <Panel header={'运营数据'}>
    <Row>
    <RecordForm onSubmit = {
      ({date, period}) => recordsApi.get({beginDay:date, days:period})
          .then(reply => props.setRecordGroups(reply.data))
        }/>
    </Row>

    <br/> <br/>

    <Row>
    <BootstrapTable 
    data={ props.recordGroups }
    exportCSV={true}
    options={options}
    >
      <TableHeaderColumn dataField='userId' hidden isKey = {true}>用户名</TableHeaderColumn>
      <TableHeaderColumn dataField='name' >用户名</TableHeaderColumn>
      <TableHeaderColumn dataField='times'>总次数</TableHeaderColumn>
      <TableHeaderColumn dataField='success'>成功次数</TableHeaderColumn>
      <TableHeaderColumn dataField='time'>时长</TableHeaderColumn>
    </BootstrapTable>
    </Row>
    </Panel>
  </Layout>
);

export default connect(
  ({record}) => record, 
  dispatch => bindActionCreators(recordActions, dispatch)
)(Page);
