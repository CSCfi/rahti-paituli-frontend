import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'
import { Collection, Map, View } from 'ol'
import * as control from 'ol/control'
import * as condition from 'ol/events/condition'
import * as ol_format from 'ol/format'
import * as interaction from 'ol/interaction'
import * as layer from 'ol/layer'
import { unByKey } from 'ol/Observable'
import * as proj from 'ol/proj'
import { register } from 'ol/proj/proj4'
import * as source from 'ol/source'
import * as style from 'ol/style'
import LayerSwitcher from 'ol-layerswitcher'
import proj4 from 'proj4'

import auth from '../shared/auth'
import datasetSelect from './components/datasetSelect'
import globals from './globals'
import datasets from './datasets'
import downloadTab from './components/downloadTab'
import featureInfoTab from './components/featureInfoTab'
import metadataTab from './components/metadataTab'
import linksTab from './components/linksTab'
import { changeLocale, translate } from '../shared/translations'
import { LOCALE } from '../shared/constants'
import { LAYER, URL } from '../shared/urls'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import '../css/download.css'

// mutable global variables
let pageDataIdParam = getUrlParameter('data_id')
let currentIndexMapLayer = null
let selectedTool = ''

changeLocale(LOCALE.FINNISH)

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
  const locationSearchInput = $('#location-search-input')
  let currentIndexMapLabelLayer = null
  let currentDataLayer = null
  let currentMaxResolution = null
  let mapContainerId = 'map-container'
  let prevSelectedTab = null

  locationSearchInput.attr('placeholder', translate('map.locationsearch'))
  const tabContainerId = 'info-container'
  const tabContainer = $('#' + tabContainerId)
  tabContainer.tabs({
    activate: (event, ui) => (prevSelectedTab = ui.newPanel.get(0).id),
  })

  function setInfoContent(contentType, params) {
    switch (contentType) {
      case 'download':
        downloadTab.init(highlightOverlay, currentIndexMapLayer)
        break
      case 'featureinfo':
        featureInfoTab.init(params, view, currentDataLayer)
        break
      case 'metadata':
        metadataTab.init()
        linksTab.init()
        break
      default:
        break
    }
  }

  const featureSearchContainer = $('#feature-search-container')

  function createSearchField() {
    const searchBtn = $('<a>', {
      class: 'btn btn-default',
      id: 'search-button',
      href: '',
    })
    searchBtn.text(translate('data.search'))
    searchBtn.on('click', searchFeatures)

    const searchField = $('<input>', {
      id: 'feature-search-field',
      type: 'search',
    })
    searchField.keyup((event) => {
      if (event.keyCode == 13) {
        searchBtn.click()
        event.target.blur()
      }
    })
    searchField.focus(() => clearSearchResults())

    const searchResults = $('<div>', {
      id: 'feature-search-results',
    })

    searchField.appendTo(featureSearchContainer)
    searchBtn.appendTo(featureSearchContainer)
    searchResults.appendTo(featureSearchContainer)
  }

  function searchFeatures() {
    const searchStr = $('#feature-search-field').val()
    if (searchStr !== null && searchStr.length > 0) {
      clearMapFeatureSelection()
      clearSearchResults()
      const features = getSearchResultFeatures(searchStr)
      globals.getSelectedFeatures().extend(features)
      $('#feature-search-results').text(
        translate('data.searchresult').replace('!features!', features.length)
      )
    }
    return false
  }

  function selectTab(tabIndex) {
    tabContainer.tabs('option', 'active', tabIndex)
  }

  function selectTabAfterDatasetChange(hasInfoTab) {
    if (prevSelectedTab == null) {
      prevSelectedTab = downloadTab.TAB_ID
    }
    let newTabId = null
    if (prevSelectedTab == downloadTab.TAB_ID) {
      newTabId = downloadTab.TAB_ID
    } else if (prevSelectedTab == featureInfoTab.TAB_ID) {
      if (hasInfoTab) {
        newTabId = featureInfoTab.TAB_ID
      } else {
        newTabId = downloadTab.TAB_ID
      }
    } else if (prevSelectedTab == metadataTab.TAB_ID) {
      newTabId = metadataTab.TAB_ID
    }
    const index = $('#' + tabContainerId + ' a[href="#' + newTabId + '"]')
      .parent()
      .index()
    $('#' + tabContainerId).tabs('option', 'active', index)
  }

  function clearSearchResults() {
    $('#feature-search-field').val('')
    $('#feature-search-results').empty()
  }

  let isFirstTimeLoaded = true
  let mapsheets = 0

  function updateMap() {
    map.removeLayer(currentIndexMapLayer)
    map.removeLayer(currentIndexMapLabelLayer)
    map.removeLayer(currentDataLayer)
    locationSearchInput.val('')
    clearMapFeatureSelection()
    featureInfoTab.clear()
    clearSearchResults()
    $('#feature-search-field').value = ''
    if (datasets.hasCurrent()) {
      setInfoContent('metadata')
      featureInfoTab.setDefaultLabel()
      loadIndexLayer()
      loadIndexMapLabelLayer()

      if (currentIndexMapLayer !== null) {
        currentIndexMapLayer.getSource().once('change', (event) => {
          let hasInfoTab = false
          if (event.target.getState() == 'ready' && isFirstTimeLoaded) {
            hasInfoTab = datasets.hasFeatureInfo()
            mapsheets = datasets.getCurrent().map_sheets
            if (mapsheets > 1) {
              featureSearchContainer.css('visibility', 'visible')
            } else if (mapsheets === 1) {
              // if there is only one mapsheet, select all files
              globals
                .getSelectedFeatures()
                .extend(currentIndexMapLayer.getSource().getFeatures())
              featureSearchContainer.css('visibility', 'hidden')
            }
            setInfoContent('download')
            isFirstTimeLoaded = false
            toggleMapControlButtonsVisibility()
          }
          selectTabAfterDatasetChange(hasInfoTab)
        })

        if (currentIndexMapLabelLayer !== null) {
          currentIndexMapLayer.on('change:visible', () => {
            if (currentIndexMapLayer.getVisible()) {
              currentIndexMapLabelLayer.setVisible(true)
            } else {
              currentIndexMapLabelLayer.setVisible(false)
            }
          })
        }

        const maxScaleResult = datasets.getCurrent().data_max_scale
        if (maxScaleResult !== null) {
          currentMaxResolution = getMapResolutionFromScale(
            parseInt(maxScaleResult)
          )
        } else {
          currentMaxResolution = null
        }

        loadDataLayer()
        if (currentDataLayer !== null) {
          map.getLayers().insertAt(1, currentDataLayer)
          clearMapWarning()
        } else {
          setDataAvailabiltyWarning()
        }
        map.addLayer(currentIndexMapLayer)
        if (currentIndexMapLabelLayer !== null) {
          map.addLayer(currentIndexMapLabelLayer)
        }
        // Kylli, without next 3 rows, the warning of previously
        // selected dataset was visible.
        if (currentMaxResolution != null) {
          setMaxResolutionWarning()
        }
      }
      tabContainer.show()
    } else {
      mapsheets = 0
      tabContainer.hide()
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

      currentIndexMapLayer = new layer.Vector({
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
      currentIndexMapLayer = null
    }
    isFirstTimeLoaded = true
  }

  function loadDataLayer() {
    if (datasets.hasCurrent() && datasets.getCurrent().data_url != null) {
      const dataUrl = datasets.getCurrent().data_url
      if (dataUrl.indexOf('protected') > -1) {
        currentDataLayer = new layer.Image({
          title: translate('map.datamap'),
          source: new source.ImageWMS({
            url: URL.WMS_PAITULI_BASE,
            params: { LAYERS: dataUrl, VERSION: '1.1.1' },
            serverType: 'geoserver',
          }),
          visible: true,
        })
      } else {
        currentDataLayer = new layer.Tile({
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
        currentDataLayer.setMaxResolution(currentMaxResolution)
      }
    } else {
      currentDataLayer = null
    }
  }

  function getMapResolutionFromScale(scale) {
    return scale / 2835
  }

  function getSearchResultFeatures(searchStr) {
    const hits = []
    currentIndexMapLayer.getSource().forEachFeature((feature) => {
      if (
        feature.get('label').toLowerCase().indexOf(searchStr.toLowerCase()) !=
        -1
      ) {
        hits.push(feature)
      }
    })
    return hits
  }

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

  const view = map.getView()

  map.on('moveend', () => setMaxResolutionWarning())

  function setMaxResolutionWarning() {
    if (currentMaxResolution !== null) {
      const currRes = view.getResolution()
      if (currRes > currentMaxResolution) {
        createMaxResolutionWarning()
      } else {
        clearMapWarning()
      }
    }
  }

  function setDataAvailabiltyWarning() {
    $('#notification-container').text(translate('map.dataAvailabilityWarning'))
    $('#notification-container').show()
  }

  function createMaxResolutionWarning() {
    $('#notification-container').text(translate('map.resolutionwarning'))
    $('#notification-container').show()
  }

  function clearMapWarning() {
    $('#notification-container').empty()
    $('#notification-container').hide()
  }

  function resetMapView() {
    view.setZoom(5)
    view.setCenter(proj.transform([500000, 7200000], 'EPSG:3067', 'EPSG:3857'))
    return false
  }

  // a normal select interaction to handle click
  const featureSelectInteraction = new interaction.Select({
    toggleCondition: condition.always,
    style: selected_style,
    multi: true, //Select several, if overlapping
  })
  featureSelectInteraction.on('select', () => setInfoContent('download'))

  const selectedFeatures = featureSelectInteraction.getFeatures()
  selectedFeatures.on('add', downloadTab.addFileLabel)
  selectedFeatures.on('remove', downloadTab.removeFileLabel)
  globals.setSelectedFeatures(selectedFeatures)

  function clearMapFeatureSelection() {
    globals.getSelectedFeatures().clear()
    setInfoContent('download')
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

    currentIndexMapLayer
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
    setInfoContent('download')
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
    const features = currentIndexMapLayer.getSource().getFeatures()

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
    setInfoContent('download')
    //Remove the drawed polygon from map. The drawend is fired before the polygon is added to the source,
    //so the first simply sets the geometry to null, and after next polygon is drawn it is properly removed.
    //Possibly there is one-liner for this.
    event.feature.setGeometry(null)
    drawingSource.clear()
  }

  draw.on('drawend', (event) => updateDrawSelection(event))

  const highlightCollection = new Collection()
  const highlightOverlay = new layer.Vector({
    map: map,
    source: new source.Vector({
      features: highlightCollection,
      useSpatialIndex: false, // optional, might improve performance
    }),
    style: highlighted_style,
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true, // optional, for instant visual feedback
  })

  function getFeatureInfo(evt) {
    setInfoContent('featureinfo', evt)
  }

  // TODO ???
  let getFeatureInfoToolKey = null

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
    unByKey(getFeatureInfoToolKey)
  }

  function selectSelectTool() {
    selectTab(0)
    $('#panselection-button').removeClass('active')
    $('#selectselection-button').addClass('active')
    $('#infoselection-button').removeClass('active')
    $('#drawselection-button').removeClass('active')

    selectedTool = 'select'
    dragPan.setActive(false)
    featureSelectInteraction.setActive(true)
    mapDragBox.setActive(true)
    draw.setActive(false)
    unByKey(getFeatureInfoToolKey)
  }

  function selectInfoTool() {
    selectTab(1)
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
    getFeatureInfoToolKey = map.on('singleclick', (event) =>
      getFeatureInfo(event)
    )
  }

  function selectDrawTool() {
    selectTab(0)
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
    unByKey(getFeatureInfoToolKey)
  }

  const layerSwitcher = new LayerSwitcher({
    tipLabel: 'Toggle layers', // Optional label for button
  })

  const scaleLineControl = new control.ScaleLine()

  function initLocationSearch() {
    locationSearchInput.keypress((event) => {
      const keyCode = event.keyCode || event.charCode
      if (keyCode == 13) {
        const searchStr = locationSearchInput.val()
        if (searchStr.length > 0) {
          const queryUrl = URL.NOMINATIM_API.replace('!query!', searchStr)
          $.getJSON(queryUrl, (data) => {
            if (data.length > 0) {
              map
                .getView()
                .setCenter(
                  proj.transform(
                    [Number(data[0].lon), Number(data[0].lat)],
                    'EPSG:4326',
                    'EPSG:3857'
                  )
                )
              if (searchStr.indexOf(',') != -1) {
                map.getView().setZoom(16)
              } else {
                map.getView().setZoom(13)
              }
            } else {
              alert(translate('map.locationNotFound'))
            }
          })
        }
      }
    })
  }

  $('#resetview-button').on('click', resetMapView)
  $('#panselection-button').on('click', selectPanTool)
  $('#selectselection-button').on('click', selectSelectTool)
  $('#clearselection-button').on('click', clearMapFeatureSelection)
  $('#infoselection-button').on('click', selectInfoTool)
  $('#drawselection-button').on('click', selectDrawTool)

  selectPanTool()

  map.addControl(overviewMap)
  map.addControl(layerSwitcher)
  map.addControl(scaleLineControl)

  datasetSelect.init(updateMap, pageDataIdParam)
  initLocationSearch()
  createSearchField()

  resetMapView()
}

// checkAccessRights();
checkParameterDatasetAccess()

$(function () {
  $('#header').load('header.html')
})
