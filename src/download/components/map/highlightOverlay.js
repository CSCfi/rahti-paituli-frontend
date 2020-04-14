import $ from 'jquery'
import * as style from 'ol/style'
import { Collection } from 'ol'
import * as layer from 'ol/layer'
import * as source from 'ol/source'

import map from './map'
import { getIndexLayer } from './index'

const highlighted_style = new style.Style({
  stroke: new style.Stroke({
    color: 'rgba(255, 51, 204,1)',
    width: 8,
  }),
  fill: new style.Fill({
    color: [255, 255, 255, 0.8],
  }),
})

const highlightCollection = new Collection()
const highlightOverlay = new layer.Vector({
  map: map.getMap(),
  source: new source.Vector({
    features: highlightCollection,
    useSpatialIndex: false, // optional, might improve performance
  }),
  style: highlighted_style,
  updateWhileAnimating: true, // optional, for instant visual feedback
  updateWhileInteracting: true, // optional, for instant visual feedback
})

function addHighlight(event) {
  highlightOverlay.getSource().clear()
  const olId = getIndexLayer()
    .getSource()
    .getFeatureById($(event.target).attr('ol_id'))
  highlightOverlay.getSource().addFeature(olId)
}

function removeHighlight(event) {
  const olId = getIndexLayer()
    .getSource()
    .getFeatureById($(event.target).attr('ol_id'))
  highlightOverlay.getSource().removeFeature(olId)
}

const clear = () => highlightOverlay.getSource().clear()

export default {
  addHighlight,
  removeHighlight,
  clear,
}
