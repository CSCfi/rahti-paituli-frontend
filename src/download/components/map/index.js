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
import notifications from './notifications'

let numberOfMapSheets = 0

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
          numberOfMapSheets = datasets.getCurrent().map_sheets
          if (numberOfMapSheets > 1) {
            featureSearch.show()
          } else if (numberOfMapSheets === 1) {
            // if there is only one mapsheet, select all files
            globals
              .getSelectedFeatures()
              .extend(indexLayer.getSource().getFeatures())
            featureSearch.hide()
          }
          tabs.setInfoContent('download')
          controls.toggleVisibility(numberOfMapSheets)
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
      const maxResolution = maxScale !== null ? parseInt(maxScale) / 2835 : null
      map.setMaxResolution(maxResolution)

      layers.loadDataLayer()
      const dataLayer = layers.getDataLayer()
      if (dataLayer !== null) {
        map.insertDataLayer(dataLayer)
      } else {
        notifications.setDataAvailabilityWarning()
      }
      map.addLayer(indexLayer)
      if (indexLabelLayer !== null) {
        map.addLayer(indexLabelLayer)
      }
      // Kylli, without next 3 rows, the warning of previously
      // selected dataset was visible.
      if (maxResolution != null) {
        notifications.setMaxResolutionWarning()
      }
    }
    tabs.show()
  } else {
    numberOfMapSheets = 0
    tabs.hide()
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
