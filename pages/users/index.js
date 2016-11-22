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
import {Panel} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

import {actions as userActions} from '../../reducers/user'
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import {users as usersApi} from '../../core/api'


class Page extends React.Component {
  
  componentDidMount(){

    const {setUsers } = this.props
    usersApi.get()
    .then(resp => setUsers(resp.data))
  
  }

  render(){
  
    // const {users, editUser, addUser, deleteUser} = this.props
    const props = this.props

    const editUser = (origin, dirty) => {
      usersApi.edit(_.assign({}, origin, dirty))
      .then(resp => props.editUser(resp.data))
    }

    const actionFormmater = (cell, row) => (
      <div>
      {
      row.state < 0 ?
      (<button className='btn btn-info' onClick={event => editUser(row, {state:0})}>解除</button>) : 
      (<button className='btn btn-warning' onClick={event => editUser(row, {state:-1})}>冻结</button>)
      }
      <button className='btn btn-danger' onClick={event => usersApi.delete(cell).then(resp => props.deleteUser(cell))}>删除</button>
      </div>
    )
    const options = {
      afterInsertRow({name, password}){
        usersApi.add({name, password})
        .then(resp => props.addUser(resp.data) )
      },
      afterSearch(searchText, displayData){
        props.searchUser(searchText)
      },
      defaultSortName:'name',
      defaultSortOrder:'desc',
      clearSearch:true,
      noDataText:'暂无数据'
    }

    const cellEditProp = {
      mode: 'click',
      // blurToSave: true,
      // beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell(row, cellName, cellValue){
        if(row[cellName] !== cellValue){
          editUser(row, {[cellName]:cellValue})
        }
      }
    };

    return (
      <Layout className={s.content}>
        <Panel header={'帐号管理'}>
        <BootstrapTable 
        data={ props.users }
        insertRow
        remote
        search={true}
        options={options}
        cellEdit={cellEditProp}
        >
          <TableHeaderColumn dataField='name' editable={{placeholder:'name'}}> 用户名 <i className="glyphicon glyphicon-pencil"></i> </TableHeaderColumn>
          <TableHeaderColumn dataField='password' editable={{placeholder:'pass'}}>密码 <i className="glyphicon glyphicon-pencil"></i> </TableHeaderColumn>
          <TableHeaderColumn dataField='created' editable={false} dataFormat={cell => (new Date(cell)).toLocaleDateString()}>创建时间</TableHeaderColumn>
          <TableHeaderColumn dataField='state' editable={false} dataFormat={cell => cell < 0 ? '冻结':'正常'}>状态</TableHeaderColumn>
          <TableHeaderColumn dataField='_id' dataAlign="center" isKey hiddenOnInsert dataFormat={actionFormmater}> 操作 </TableHeaderColumn>
        </BootstrapTable>
        </Panel>
      </Layout>
    );
  }
}

export default connect(
  state => ({users : state.user.users}),
  dispatch => bindActionCreators(userActions, dispatch)
)(Page);
