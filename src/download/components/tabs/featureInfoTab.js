import $ from 'jquery'

import { translate } from '../../../shared/translations'
import globals from '../../globals'

const TAB_ID = 'feature-info-container'
const rootElem = $('#' + TAB_ID)

function init(event, view) {
  rootElem.empty()
  const dataLayer = globals.getDataLayer()
  if (dataLayer) {
    const viewResolution = view.getResolution()
    const url = dataLayer
      .getSource()
      .getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', {
        INFO_FORMAT: 'text/plain',
        outputFormat: 'text/javascript',
      })
    if (url) {
      const iframe =
        '<iframe id="feature-info-iframe" seamless src="' + url + '"></iframe>'
      rootElem.html(iframe)
    }
  }
}

function clear() {
  const label = $('<div>', {
    id: 'feature-info-default-label',
  })
  label.append(translate('info.featureinfodefault'))
  rootElem.empty()
  rootElem.append(label)
}

export default {
  TAB_ID,
  init,
  clear,
}
