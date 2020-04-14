import $ from 'jquery'
import * as layer from 'ol/layer'
import * as ol_format from 'ol/format'
import * as source from 'ol/source'
import * as style from 'ol/style'

import controls from './controls'
import datasets from '../../datasets'
import featureSearch from '../featureSearch'
import globals from '../../globals'
import highlightOverlay from './highlightOverlay'
import locationSearch from '../locationSearch'
import map from './map'
import tabs from '../tabs'
import { translate } from '../../../shared/translations'
import { URL } from '../../../shared/urls'

let dataLayer = null
let indexLayer = null
let indexLabelLayer = null
let currentMaxResolution = null
// TODO
let isFirstTimeLoaded = true
let mapsheets = 0

function update() {
  map.removeLayer(indexLayer)
  map.removeLayer(indexLabelLayer)
  map.removeLayer(dataLayer)
  locationSearch.clear()
  controls.clearFeatureSelection()
  tabs.clearFeatureInfo()
  featureSearch.clearResults()
  $('#feature-search-field').value = ''
  if (datasets.hasCurrent()) {
    tabs.setInfoContent('metadata')
    loadIndexLayer()
    loadIndexMapLabelLayer()

    if (indexLayer !== null) {
      indexLayer.getSource().once('change', (event) => {
        let hasInfoTab = false
        if (event.target.getState() == 'ready' && isFirstTimeLoaded) {
          hasInfoTab = datasets.hasFeatureInfo()
          mapsheets = datasets.getCurrent().map_sheets
          if (mapsheets > 1) {
            featureSearch.show()
          } else if (mapsheets === 1) {
            // if there is only one mapsheet, select all files
            globals
              .getSelectedFeatures()
              .extend(indexLayer.getSource().getFeatures())
            featureSearch.hide()
          }
          tabs.setInfoContent('download')
          isFirstTimeLoaded = false
          toggleMapControlButtonsVisibility()
        }
        tabs.selectTabAfterDatasetChange(hasInfoTab)
      })

      if (indexLabelLayer !== null) {
        indexLayer.on('change:visible', () => {
          if (indexLayer.getVisible()) {
            indexLabelLayer.setVisible(true)
          } else {
            indexLabelLayer.setVisible(false)
          }
        })
      }

      const maxScale = datasets.getCurrent().data_max_scale
      if (maxScale !== null) {
        currentMaxResolution = parseInt(maxScale) / 2835
      } else {
        currentMaxResolution = null
      }

      loadDataLayer()
      if (dataLayer !== null) {
        map.insertDataLayer(dataLayer)
      } else {
        setDataAvailabilityWarning()
      }
      map.addLayer(indexLayer)
      if (indexLabelLayer !== null) {
        map.addLayer(indexLabelLayer)
      }
      // Kylli, without next 3 rows, the warning of previously
      // selected dataset was visible.
      if (currentMaxResolution != null) {
        map.setMaxResolutionWarning(currentMaxResolution)
      }
    }
    tabs.show()
  } else {
    mapsheets = 0
    tabs.hide()
  }
}

const panSelectBtn = $('#panselection-button')
const selectSelectContainer = $('#selectselection-container')
const clearSelectContainer = $('#clearselection-container')
const infoSelectContainer = $('#infoselection-container')
const infoSelectBtn = $('#infoselection-button')
const drawSelectContainer = $('#drawselection-container')
selectSelectContainer.hide()
clearSelectContainer.hide()
infoSelectContainer.hide()
drawSelectContainer.hide()

function setDataAvailabilityWarning() {
  $('#notification-container').text(translate('map.dataAvailabilityWarning'))
  $('#notification-container').show()
}

//Show map related tools
function toggleMapControlButtonsVisibility() {
  // If more than 1 mapsheet, show mapsheet selection tools
  if (mapsheets > 1) {
    selectSelectContainer.show()
    clearSelectContainer.show()
    drawSelectContainer.show()
  } else {
    selectSelectContainer.hide()
    clearSelectContainer.hide()
    drawSelectContainer.hide()
  }
  // If layers has feature info, show info tool and container for results
  if (datasets.hasFeatureInfo()) {
    infoSelectContainer.show()
    $('#feature-info-container-tab').show()
  } else {
    if (infoSelectBtn.hasClass('active')) {
      panSelectBtn.click()
    }
    infoSelectContainer.hide()
    $('#feature-info-container-tab').hide()
  }
}

function loadIndexMapLabelLayer() {
  if (datasets.hasCurrent()) {
    const url = URL.WMS_INDEX_MAP_LABEL_LAYER.replace(
      '!value!',
      datasets.getCurrent().data_id
    )
    const src = new source.ImageWMS({
      url: url,
      params: { VERSION: '1.1.1' },
      serverType: 'geoserver',
    })

    indexLabelLayer = new layer.Image({
      source: src,
      visible: true,
    })
  } else {
    indexLabelLayer = null
  }
}

function loadIndexLayer() {
  if (datasets.hasCurrent()) {
    const url = URL.WFS_INDEX_MAP_LAYER.replace('!key!', 'data_id').replace(
      '!value!',
      datasets.getCurrent().data_id
    )
    const indexSource = new source.Vector({
      format: new ol_format.GeoJSON(),
      loader: () => {
        $.ajax({
          jsonpCallback: 'loadIndexMapFeatures',
          dataType: 'jsonp',
          url:
            url +
            '&outputFormat=text/javascript&format_options=callback:loadIndexMapFeatures',
          success: (response) => {
            const features = indexSource.getFormat().readFeatures(response)
            indexSource.addFeatures(features)
          },
        })
      },
    })
    indexLayer = new layer.Vector({
      title: translate('map.indexmap'),
      source: indexSource,
      visible: true,
      style: new style.Style({
        stroke: new style.Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
      }),
    })
  } else {
    indexLayer = null
  }
  isFirstTimeLoaded = true
}

function loadDataLayer() {
  if (datasets.hasCurrent() && datasets.getCurrent().data_url != null) {
    const dataUrl = datasets.getCurrent().data_url
    if (dataUrl.indexOf('protected') > -1) {
      dataLayer = new layer.Image({
        title: translate('map.datamap'),
        source: new source.ImageWMS({
          url: URL.WMS_PAITULI_BASE,
          params: { LAYERS: dataUrl, VERSION: '1.1.1' },
          serverType: 'geoserver',
        }),
        visible: true,
      })
    } else {
      dataLayer = new layer.Tile({
        title: translate('map.datamap'),
        source: new source.TileWMS({
          url: URL.WMS_PAITULI_BASE_GWC,
          params: { LAYERS: dataUrl, VERSION: '1.1.1' },
          serverType: 'geoserver',
        }),
        visible: true,
      })
    }

    if (currentMaxResolution !== null) {
      dataLayer.setMaxResolution(currentMaxResolution)
    }
  } else {
    dataLayer = null
  }
}

const getDataLayer = () => dataLayer
export const getIndexLayer = () => indexLayer
const clearFeatureSelection = () => controls.clearFeatureSelection()
const addHighlight = (event) => highlightOverlay.addHighlight(event)
const removeHighlight = (event) => highlightOverlay.removeHighlight(event)
const clearHighlights = () => highlightOverlay.clear()
const resetView = () => map.resetView()
const getView = () => map.getView()

export default {
  update,
  getDataLayer,
  getIndexLayer,
  clearFeatureSelection,
  addHighlight,
  removeHighlight,
  clearHighlights,
  getView,
  resetView,
}
