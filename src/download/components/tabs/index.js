import downloadTab from './downloadTab'
import featureInfoTab from './featureInfoTab'
import metadataTab from './metadataTab'
import linksTab from './linksTab'
import $ from 'jquery'

const tabContainerId = 'info-container'
const tabContainer = $('#' + tabContainerId)
tabContainer.tabs({
  activate: (event, ui) => (prevSelectedTab = ui.newPanel.get(0).id),
})
let prevSelectedTab = null
let highlightOverlay, view

// TODO
function init(overlay, mapView) {
  highlightOverlay = overlay
  view = mapView
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

function setInfoContent(contentType, params) {
  switch (contentType) {
    case 'download':
      downloadTab.init(highlightOverlay)
      break
    case 'featureinfo':
      featureInfoTab.init(params, view)
      break
    case 'metadata':
      metadataTab.init()
      linksTab.init()
      break
    default:
      break
  }
}

// TODO
function selectTab(tabIndex) {
  tabContainer.tabs('option', 'active', tabIndex)
}

const show = () => tabContainer.show()
const hide = () => tabContainer.hide()
const clearFeatureInfo = () => featureInfoTab.clear()
const addFileLabel = (event) => downloadTab.addFileLabel(event)
const removeFileLabel = (event) => downloadTab.removeFileLabel(event)

export default {
  init,
  show,
  hide,
  clearFeatureInfo,
  addFileLabel,
  removeFileLabel,
  selectTab,
  setInfoContent,
  selectTabAfterDatasetChange,
}
