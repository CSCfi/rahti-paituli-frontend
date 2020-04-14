import $ from 'jquery'
import { Map, View } from 'ol'
import * as control from 'ol/control'
import * as layer from 'ol/layer'
import * as proj from 'ol/proj'
import * as source from 'ol/source'
import LayerSwitcher from 'ol-layerswitcher'
import { unByKey } from 'ol/Observable'
import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'

import tabs from '../tabs'
import { translate } from '../../../shared/translations'
import { LAYER, URL } from '../../../shared/urls'

proj4.defs([
  [
    'EPSG:3067',
    '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  ],
  [
    'EPSG:3857',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  ],
])
register(proj4)

const mapContainerId = 'map-container'

const osmLayerOptions = {
  title: translate('map.basemap'),
  source: new source.TileWMS({
    url: 'http://ows.terrestris.de/osm/service?',
    attributions:
      'Background map: © <a target="_blank" href="http://ows.terrestris.de/dienste.html">terrestris</a>. Data: © <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    params: {
      LAYERS: 'OSM-WMS',
      VERSION: '1.1.0',
    },
  }),
  opacity: 1.0,
  visible: true,
}

const municipalitiesLayer = new layer.Tile({
  title: translate('map.municipalitiesmap'),
  source: new source.TileWMS({
    url: URL.WMS_PAITULI_BASE,
    params: {
      LAYERS: LAYER.MUNICIPALITIES_LAYER,
      SRS: 'EPSG:3067',
      VERSION: '1.1.0',
    },
  }),
  opacity: 1.0,
  visible: false,
})

const catchmentLayer = new layer.Tile({
  title: translate('map.catchment'),
  source: new source.TileWMS({
    url: URL.WMS_PAITULI_BASE,
    params: {
      LAYERS: LAYER.CATCHMENT_AREAS_LAYER,
      SRS: 'EPSG:2393',
      VERSION: '1.1.0',
    },
  }),
  opacity: 1.0,
  visible: false,
})

const overviewMap = new control.OverviewMap({
  collapsed: false,
  layers: [new layer.Tile(osmLayerOptions)],
})

const map = new Map({
  layers: [
    new layer.Tile(osmLayerOptions),
    catchmentLayer,
    municipalitiesLayer,
  ],
  target: mapContainerId,
  view: new View({
    center: proj.transform([500000, 7200000], 'EPSG:3067', 'EPSG:3857'),
    zoom: 5,
  }),
})

map.on('moveend', () => setMaxResolutionWarning())

const layerSwitcher = new LayerSwitcher({
  tipLabel: 'Toggle layers', // Optional label for button
})

const scaleLineControl = new control.ScaleLine()

map.addControl(overviewMap)
map.addControl(layerSwitcher)
map.addControl(scaleLineControl)

// TODO notification container module
function setMaxResolutionWarning(currentMaxResolution) {
  if (currentMaxResolution !== null) {
    const currRes = map.getView().getResolution()
    if (currRes > currentMaxResolution) {
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

function insertDataLayer(dataLayer) {
  map.getLayers().insertAt(1, dataLayer)
  clearWarning()
}

function clearWarning() {
  $('#notification-container').empty()
  $('#notification-container').hide()
}

function resetView() {
  const view = map.getView()
  view.setZoom(5)
  view.setCenter(proj.transform([500000, 7200000], 'EPSG:3067', 'EPSG:3857'))
  map.updateSize()
}

let infoToolListenerKey
function addInfoToolListener() {
  infoToolListenerKey = map.on('singleclick', (event) =>
    tabs.setInfoContent('featureinfo', event)
  )
}
const removeInfoToolListener = () => unByKey(infoToolListenerKey)

const getMap = () => map
const getView = () => map.getView()
const addLayer = (layer) => map.addLayer(layer)
const removeLayer = (layer) => map.removeLayer(layer)
const getInteractions = () => map.getInteractions()
const addInteraction = (interaction) => map.addInteraction(interaction)

export default {
  getMap,
  getView,
  addLayer,
  removeLayer,
  insertDataLayer,
  getInteractions,
  addInteraction,
  resetView,
  clearWarning,
  setMaxResolutionWarning,
  addInfoToolListener,
  removeInfoToolListener,
}
