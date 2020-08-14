import $ from 'jquery'
import * as style from 'ol/style'
import layers from './layers'
import controls from './controls'

var highlightStyleFunction = function (feature) {
  return [
    new style.Style({
      stroke: new style.Stroke({
        color: 'rgba(255, 51, 204,1)',
        width: 4,
      }),
      fill: new style.Fill({
        color: [255, 255, 255, 0.4],
      }),
      text: new style.Text({
        text: feature.get('label'),
        stroke: new style.Stroke({ width: 0.6 }),
      }),
      zIndex: 100,
    }),
  ]
}

function addHighlight(event) {
  const olId = layers
    .getIndexLayer()
    .getSource()
    .getFeatureById($(event.target).attr('ol_id'))
  olId.setStyle(highlightStyleFunction)
}

function removeHighlight(event) {
  const olId = layers
    .getIndexLayer()
    .getSource()
    .getFeatureById($(event.target).attr('ol_id'))
  olId.setStyle(controls.getSelectedStyleFunction)
}

export default {
  addHighlight,
  removeHighlight,
}
