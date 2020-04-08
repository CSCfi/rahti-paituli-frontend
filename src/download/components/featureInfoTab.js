import $ from 'jquery'
import { translate } from '../../shared/translations'

const TAB_ID = 'feature-info-container'
const rootElem = $('#' + TAB_ID)

function init(event, view, layer) {
  rootElem.empty()
  if (layer) {
    const viewResolution = view.getResolution()
    const url = layer
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
  rootElem.empty()
}

function reset() {
  const featureInfoDefaultLabel = $('<div>', {
    id: 'feature-info-default-label',
  })
  featureInfoDefaultLabel.append(translate('info.featureinfodefault'))
  rootElem.append(featureInfoDefaultLabel)
}

export default {
  TAB_ID,
  init,
  clear,
  reset,
}
