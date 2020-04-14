import $ from 'jquery'
import { translate } from '../../shared/translations'
import globals from '../globals'
import map from './map'

const featureSearchContainer = $('#feature-search-container')

function init() {
  const searchBtn = $('<a>', {
    class: 'btn btn-default',
    id: 'search-button',
    href: '',
  })
  searchBtn.text(translate('data.search'))
  searchBtn.on('click', () => searchFeatures())

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
  searchField.focus(clearResults)

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
    map.clearFeatureSelection()
    clearResults()
    const features = getSearchResultFeatures(searchStr)
    globals.getSelectedFeatures().extend(features)
    $('#feature-search-results').text(
      translate('data.searchresult').replace('!features!', features.length)
    )
  }
  return false
}

function clearResults() {
  $('#feature-search-field').val('')
  $('#feature-search-results').empty()
}

function getSearchResultFeatures(searchStr) {
  const hits = []
  map
    .getIndexLayer()
    .getSource()
    .forEachFeature((feature) => {
      if (
        feature.get('label').toLowerCase().includes(searchStr.toLowerCase())
      ) {
        hits.push(feature)
      }
    })
  return hits
}

const show = () => featureSearchContainer.css('visibility', 'visible')
const hide = () => featureSearchContainer.css('visibility', 'hidden')

export default {
  init,
  clearResults,
  show,
  hide,
}
