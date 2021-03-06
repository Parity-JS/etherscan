// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const nock = require('nock');
const { stringify } = require('qs');

const { url } = require('./links');

function mockget (requests, test, netVersion) {
  let scope = nock(url(test, netVersion));

  requests.forEach((request) => {
    scope = scope
      .get(`/api?${stringify(request.query)}`)
      .reply(request.code || 200, () => {
        return { result: request.reply };
      });
  });

  return scope;
}

module.exports = {
  mockget
};
