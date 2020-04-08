function init(rootElem, event, view, layer) {
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

export default {
  init,
}
