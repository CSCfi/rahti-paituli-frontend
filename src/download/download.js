import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'
import { Collection } from 'ol'
import * as condition from 'ol/events/condition'
import * as ol_format from 'ol/format'
import * as interaction from 'ol/interaction'
import * as layer from 'ol/layer'
import * as source from 'ol/source'
import * as style from 'ol/style'

import auth from '../shared/auth'
import datasets from './datasets'
import datasetSelect from './components/datasetSelect'
import featureSearch from './components/featureSearch'
import globals from './globals'
import locationSearch from './components/locationSearch'
import map from './components/map'
import tabs from './components/tabs'
import { changeLocale, translate } from '../shared/translations'
import { LOCALE } from '../shared/constants'
import { URL } from '../shared/urls'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import '../css/download.css'

// mutable global variables
let pageDataIdParam = getUrlParameter('data_id')
let selectedTool = ''

changeLocale(LOCALE.FINNISH)

function getUrlParameter(param) {
  const pageURL = window.location.search.substring(1)
  const urlVariables = pageURL.split('&')
  for (let i = 0; i < urlVariables.length; i++) {
    const parameterName = urlVariables[i].split('=')
    if (parameterName[0] == param) {
      return parameterName[1]
    }
  }
  return null
}

/* TODO Haka login

let geoserver_username = ''
let geoserver_password = ''

// If the user is logged in with HAKA, let's set ready GeoServer's username and
// password for paituli_protected datasets
function checkAccessRights() {
  hakaUser = Liferay.ThemeDisplay.isSignedIn()
  if (hakaUser) {
    $.ajax({
      url: '/secure/files/geoserverp.txt',
      dataType: 'json',
      success: (result) => {
        geoserver_username = result.username
        geoserver_password = result.pwd
        let testurl =
          'https://avaa.tdata.fi/geoserver/paituli_protected/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=paituli_protected:il_temp_monthly_stat&maxFeatures=1&outputFormat=application%2Fjson'

        $.ajax({
          password: geoserver_password,
          username: geoserver_username,
          url: testurl,
          type: 'GET',
          success: () => console.log('log in success'),
          error: (err) => console.err('log in not successful', err),
        })
      },
    })
  } else {
    hakaUser = false
    geoserver_username = ''
    geoserver_password = ''
  }
}
*/

function checkParameterDatasetAccess() {
  datasets.fetch(() => {
    if (pageDataIdParam === null || pageDataIdParam.length == 0) {
      main()
    } else {
      const selectedData = datasets.getById(pageDataIdParam)
      if (
        selectedData != null &&
        selectedData.access == 2 &&
        !auth.loggedIn()
      ) {
        // TODO: redirect user to login page
        window.location.replace('/')
      } else {
        main()
      }
    }
  })
}

function setTranslations() {
  $('#dl-service-header h1').text(translate('appHeader'))
  $('#data-form legend').text(translate('data.header'))
  $('#resetview-button').attr('title', translate('map.reset'))
  $('#clearselection-button').attr('title', translate('map.clearSelection'))
  $('#panselection-button').attr('title', translate('map.pan'))
  $('#selectselection-button').attr('title', translate('map.select'))
  $('#infoselection-button').attr('title', translate('map.info'))
  $('#drawselection-button').attr('title', translate('map.draw'))

  $('#download-container-anchor').text(translate('info.downloadtab'))
  $('#feature-info-container-anchor').text(translate('info.featureinfotab'))
  $('#metadata-container-anchor').text(translate('info.metadatatab'))
  $('#links-container-anchor').text(translate('info.linkstab'))
}

function main() {
  setTranslations()

  $(document).tooltip({ track: true })

  const selected_style = new style.Style({
    stroke: new style.Stroke({
      color: 'rgba(102, 178, 255, 1.0)',
      width: 3,
    }),
    fill: new style.Fill({
      color: [255, 255, 255, 0.4],
    }),
    image: new style.Circle({
      radius: 4,
      fill: new style.Fill({
        color: 'rgba(102, 178, 255, 1.0)',
      }),
    }),
  })

  const highlighted_style = new style.Style({
    stroke: new style.Stroke({
      color: 'rgba(255, 51, 204,1)',
      width: 8,
    }),
    fill: new style.Fill({
      color: [255, 255, 255, 0.8],
    }),
  })

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
  let currentIndexMapLabelLayer = null
  let currentMaxResolution = null
  let isFirstTimeLoaded = true
  let mapsheets = 0

  function updateMap() {
    map.removeLayer(globals.getIndexLayer())
    map.removeLayer(currentIndexMapLabelLayer)
    map.removeLayer(globals.getDataLayer())
    locationSearch.clear()
    clearMapFeatureSelection()
    tabs.clearFeatureInfo()
    featureSearch.clearResults()
    $('#feature-search-field').value = ''
    if (datasets.hasCurrent()) {
      tabs.setInfoContent('metadata')
      loadIndexLayer()
      loadIndexMapLabelLayer()

      if (globals.getIndexLayer() !== null) {
        globals
          .getIndexLayer()
          .getSource()
          .once('change', (event) => {
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
                  .extend(globals.getIndexLayer().getSource().getFeatures())
                featureSearch.hide()
              }
              tabs.setInfoContent('download')
              isFirstTimeLoaded = false
              toggleMapControlButtonsVisibility()
            }
            tabs.selectTabAfterDatasetChange(hasInfoTab)
          })

        if (currentIndexMapLabelLayer !== null) {
          globals.getIndexLayer().on('change:visible', () => {
            if (globals.getIndexLayer().getVisible()) {
              currentIndexMapLabelLayer.setVisible(true)
            } else {
              currentIndexMapLabelLayer.setVisible(false)
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
        if (globals.getDataLayer() !== null) {
          map.getLayers().insertAt(1, globals.getDataLayer())
          map.clearWarning()
        } else {
          setDataAvailabilityWarning()
        }
        map.addLayer(globals.getIndexLayer())
        if (currentIndexMapLabelLayer !== null) {
          map.addLayer(currentIndexMapLabelLayer)
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

      currentIndexMapLabelLayer = new layer.Image({
        source: src,
        visible: true,
      })
    } else {
      currentIndexMapLabelLayer = null
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

      globals.setIndexLayer(
        new layer.Vector({
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
      )
    } else {
      globals.setIndexLayer(null)
    }
    isFirstTimeLoaded = true
  }

  function loadDataLayer() {
    if (datasets.hasCurrent() && datasets.getCurrent().data_url != null) {
      const dataUrl = datasets.getCurrent().data_url
      if (dataUrl.indexOf('protected') > -1) {
        globals.setDataLayer(
          new layer.Image({
            title: translate('map.datamap'),
            source: new source.ImageWMS({
              url: URL.WMS_PAITULI_BASE,
              params: { LAYERS: dataUrl, VERSION: '1.1.1' },
              serverType: 'geoserver',
            }),
            visible: true,
          })
        )
      } else {
        globals.setDataLayer(
          new layer.Tile({
            title: translate('map.datamap'),
            source: new source.TileWMS({
              url: URL.WMS_PAITULI_BASE_GWC,
              params: { LAYERS: dataUrl, VERSION: '1.1.1' },
              serverType: 'geoserver',
            }),
            visible: true,
          })
        )
      }

      if (currentMaxResolution !== null) {
        globals.getDataLayer().setMaxResolution(currentMaxResolution)
      }
    } else {
      globals.setDataLayer(null)
    }
  }

  function setDataAvailabilityWarning() {
    $('#notification-container').text(translate('map.dataAvailabilityWarning'))
    $('#notification-container').show()
  }

  // a normal select interaction to handle click
  const featureSelectInteraction = new interaction.Select({
    toggleCondition: condition.always,
    style: selected_style,
    multi: true, //Select several, if overlapping
  })
  featureSelectInteraction.on('select', () => tabs.setInfoContent('download'))

  const selectedFeatures = featureSelectInteraction.getFeatures()
  selectedFeatures.on('add', tabs.addFileLabel)
  selectedFeatures.on('remove', tabs.removeFileLabel)
  globals.setSelectedFeatures(selectedFeatures)

  function clearMapFeatureSelection() {
    globals.getSelectedFeatures().clear()
    tabs.setInfoContent('download')
    return false
  }

  map.addInteraction(featureSelectInteraction)

  // a DragBox interaction used to select features by drawing boxes
  const mapDragBox = new interaction.DragBox({})

  mapDragBox.on('boxend', () => {
    const extent = mapDragBox.getGeometry().getExtent()

    // Check which mapsheets were selected before and which are new
    const newFeatures = []
    const oldFeaturesInSelection = []
    let existing

    globals
      .getIndexLayer()
      .getSource()
      .forEachFeatureIntersectingExtent(extent, (feature) => {
        existing = globals.getSelectedFeatures().remove(feature)
        if (existing) {
          oldFeaturesInSelection.push(feature)
        } else {
          newFeatures.push(feature)
        }
      })
    if (newFeatures.length > 0) {
      globals.getSelectedFeatures().extend(oldFeaturesInSelection)
      globals.getSelectedFeatures().extend(newFeatures)
    }
    tabs.setInfoContent('download')
  })
  map.addInteraction(mapDragBox)

  /* Add drawing vector source */
  const drawingSource = new source.Vector({
    useSpatialIndex: false,
  })

  /* Add drawing layer */
  const drawingLayer = new layer.Vector({
    source: drawingSource,
  })
  map.addLayer(drawingLayer)

  /*
   * Declare interactions and listener globally so we can attach listeners to
   * them later.
   */
  let draw

  // Drawing interaction
  draw = new interaction.Draw({
    source: drawingSource,
    type: 'Polygon',
    style: selected_style,
  })
  map.addInteraction(draw)

  function updateDrawSelection(event) {
    const polygon = event.feature.getGeometry()
    const features = globals.getIndexLayer().getSource().getFeatures()

    const newFeatures = []
    const oldFeaturesInSelection = []
    let existing

    for (let i = 0; i < features.length; i++) {
      if (polygon.intersectsExtent(features[i].getGeometry().getExtent())) {
        existing = globals.getSelectedFeatures().remove(features[i])
        if (existing) {
          oldFeaturesInSelection.push(features[i])
        } else {
          newFeatures.push(features[i])
        }
      }
    }

    if (newFeatures.length > 0) {
      globals.getSelectedFeatures().extend(oldFeaturesInSelection)
      globals.getSelectedFeatures().extend(newFeatures)
    }
    tabs.setInfoContent('download')
    //Remove the drawed polygon from map. The drawend is fired before the polygon is added to the source,
    //so the first simply sets the geometry to null, and after next polygon is drawn it is properly removed.
    //Possibly there is one-liner for this.
    event.feature.setGeometry(null)
    drawingSource.clear()
  }

  draw.on('drawend', (event) => updateDrawSelection(event))

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

  // Select right tool
  // Set default
  let dragPan
  map.getInteractions().forEach((i) => {
    if (i instanceof interaction.DragPan) {
      dragPan = i
    }
  }, this)

  // Set interactions based on selection
  function selectPanTool() {
    $('#panselection-button').addClass('active')
    $('#selectselection-button').removeClass('active')
    $('#infoselection-button').removeClass('active')
    $('#drawselection-button').removeClass('active')

    selectedTool = 'drag'
    dragPan.setActive(true)
    featureSelectInteraction.setActive(false)
    mapDragBox.setActive(false)
    draw.setActive(false)
    map.removeInfoToolListener()
  }

  function selectSelectTool() {
    tabs.selectTab(0)

    $('#panselection-button').removeClass('active')
    $('#selectselection-button').addClass('active')
    $('#infoselection-button').removeClass('active')
    $('#drawselection-button').removeClass('active')

    selectedTool = 'select'
    dragPan.setActive(false)
    featureSelectInteraction.setActive(true)
    mapDragBox.setActive(true)
    draw.setActive(false)
    map.removeInfoToolListener()
  }

  function selectInfoTool() {
    tabs.selectTab(1)

    $('#panselection-button').removeClass('active')
    $('#selectselection-button').removeClass('active')
    $('#infoselection-button').addClass('active')
    $('#drawselection-button').removeClass('active')

    selectedTool = 'info'
    featureSelectInteraction.setActive(false)
    mapDragBox.setActive(false)
    draw.setActive(false)
    if (selectedTool != 'drag') {
      dragPan.setActive(true)
    }
    map.addInfoToolListener()
  }

  function selectDrawTool() {
    tabs.selectTab(0)

    $('#panselection-button').removeClass('active')
    $('#selectselection-button').removeClass('active')
    $('#infoselection-button').removeClass('active')
    $('#drawselection-button').addClass('active')

    selectedTool = 'draw'
    dragPan.setActive(true)
    featureSelectInteraction.setActive(false)
    mapDragBox.setActive(false)
    mapDragBox.setActive(false)
    draw.setActive(true)
    map.removeInfoToolListener()
  }

  $('#resetview-button').on('click', () => map.resetView())
  $('#panselection-button').on('click', selectPanTool)
  $('#selectselection-button').on('click', selectSelectTool)
  $('#clearselection-button').on('click', clearMapFeatureSelection)
  $('#infoselection-button').on('click', selectInfoTool)
  $('#drawselection-button').on('click', selectDrawTool)

  selectPanTool()

  tabs.init(highlightOverlay)
  datasetSelect.init(updateMap, pageDataIdParam)
  locationSearch.init()
  featureSearch.init(clearMapFeatureSelection)

  map.resetView()
}

// checkAccessRights();
checkParameterDatasetAccess()

$(function () {
  $('#header').load('header.html')
})
