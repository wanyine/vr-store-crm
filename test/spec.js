/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';

describe('test suite', () => {

  it('test', () => {
    expect(true).to.be.equal.true;
  });

});

import {users, records} from '../core/api'
import axios from 'axios'

axios.interceptors.request.use(function(config){
  console.log(config)
  return config
})


describe('record resource', () => {

  it('test', (done) => {
    let promise = users.get({a:1})
    promise = records.get({b:1})
    expect(promise).to.be.equal.true;
  });

});
