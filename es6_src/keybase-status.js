// @flow
import {execToJson} from './exec-to-json.js'

import type {
  CbAny,
  CbDeviceUsernamePair,
} from './types.js'

// ----------------------------------------------------------------------------
// calls back with a JSON object describing the user's
// status with Keybase. For example, status.Username and status.Device.name
// may be of interest
// ----------------------------------------------------------------------------

export function getKeybaseNativeStatusJson (cb: CbAny): void {
  execToJson({command: 'keybase', args: ['status', '-j']}, (err, status) => {
    cb(err, status)
  })
}

// ----------------------------------------------------------------------------
// calls back with just {username, devicename}, if fully logged in and
// unlocked.
// ----------------------------------------------------------------------------

export function getKeybaseUsernameAndDevicename (cb : CbDeviceUsernamePair) {
  getKeybaseNativeStatusJson((err, status) => {
    if (status && status.Username && status.Device && status.Device.name) {
      return cb(null, {username: status.Username, devicename: status.Device.name})
    } else {
      if (!err) {
        err = new Error('failed to get username + device name')
      }
      return cb(err, null)
    }
  })
}
