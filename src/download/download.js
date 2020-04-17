import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import auth from '../shared/auth'
import datasets from './datasets'
import datasetSelect from './components/datasetSelect'
import featureSearch from './components/featureSearch'
import locationSearch from './components/locationSearch'
import map from './components/map'
import { translate } from '../shared/translations'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import '../css/download.css'

let pageDataIdParam = getUrlParameter('data_id')

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

function fetchDatasets() {
  datasets.fetch().done(() => {
    if (pageDataIdParam === null || pageDataIdParam.length == 0) {
      init()
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
        init()
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

function init() {
  $(document).tooltip({ track: true })
  setTranslations()
  datasetSelect.init(pageDataIdParam)
  locationSearch.init()
  featureSearch.init()
  map.resetView()
}

// checkAccessRights();
fetchDatasets()

$(function () {
  $('#header').load('header.html')
})
