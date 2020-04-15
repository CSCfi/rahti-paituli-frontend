import $ from 'jquery'

import controls from './controls'
import datasets from '../../datasets'
import featureSearch from '../featureSearch'
import globals from '../../globals'
import highlightOverlay from './highlightOverlay'
import locationSearch from '../locationSearch'
import map from './map'
import tabs from '../tabs'
import layers from './layers'
import { translate } from '../../../shared/translations'

let maxResolution = null
let mapsheets = 0

function update() {
  map.removeLayer(layers.getIndexLayer())
  map.removeLayer(layers.getIndexLabelLayer())
  map.removeLayer(layers.getDataLayer())
  locationSearch.clear()
  controls.clearFeatureSelection()
  tabs.clearFeatureInfo()
  featureSearch.clearResults()
  $('#feature-search-field').value = ''

  if (datasets.hasCurrent()) {
    tabs.setInfoContent('metadata')
    layers.loadIndexLayer()
    layers.loadIndexLabelLayer()

    const indexLayer = layers.getIndexLayer()
    const indexLabelLayer = layers.getIndexLabelLayer()

    if (indexLayer !== null) {
      indexLayer.getSource().once('change', (event) => {
        let hasInfoTab = false
        if (event.target.getState() == 'ready') {
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
        maxResolution = parseInt(maxScale) / 2835
      } else {
        maxResolution = null
      }

      layers.loadDataLayer(maxResolution)
      const dataLayer = layers.getDataLayer()
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
      if (maxResolution != null) {
        map.setMaxResolutionWarning(maxResolution)
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

const getDataLayer = () => layers.getDataLayer()
const getIndexLayer = () => layers.getIndexLayer()
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
