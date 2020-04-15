import $ from 'jquery'
import { translate } from '../../../shared/translations'

import map from './map'

function setDataAvailabilityWarning() {
  $('#notification-container').text(translate('map.dataAvailabilityWarning'))
  $('#notification-container').show()
}

function setMaxResolutionWarning() {
  if (map.getMaxResolution() !== null) {
    if (map.getView().getResolution() > map.getMaxResolution()) {
      createMaxResolutionWarning()
    } else {
      clearWarning()
    }
  }
}

function createMaxResolutionWarning() {
  $('#notification-container').text(translate('map.resolutionwarning'))
  $('#notification-container').show()
}

function clearWarning() {
  $('#notification-container').empty()
  $('#notification-container').hide()
}

export default {
  setDataAvailabilityWarning,
  setMaxResolutionWarning,
  clearWarning,
}
