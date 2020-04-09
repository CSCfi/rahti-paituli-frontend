import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import { translate, getCurrentLocale, changeLocale } from './translations'
import { LOCALE } from './constants'

import '../css/header.css'

const languageSelector = $('#language-selector')
// const contactInitiator = $('#contact-initiator')
// const loginInitiator = $('#login-initiator')

// const homeLink = $('#home-link')
const metadataLink = $('#metadata-link')
const downloadLink = $('#download-link')
// const guideLink = $('#guide-link')
// const apiLink = $('#api-link')
// const ftpLink = $('#ftp-link')
// const openDataLink = $('#open-data-link')
// const contactInfoLink = $('#contact-info-link')

function setTranslations() {
  $('#metadata-link').text(translate('header.metadataPage'))
  $('#download-link').text(translate('header.downloadPage'))
  $('#guide-link').text(translate('header.guidePage'))
  $('#api-link').text(translate('header.apiPage'))
  $('#ftp-link').text(translate('header.ftpPage'))
  $('#open-data-link').text(translate('header.openDataPage'))
  $('#contact-info-link').text(translate('header.contactPage'))
  $('#contact-initiator').text(translate('header.contact'))
  $('#language-selector').text(translate('header.language'))
  $('#login-initiator').text(translate('header.login'))
  $('#search-form').attr('placeholder', translate('header.searchPlaceholder'))
  $('#header-search-button').text(translate('header.searchButton'))
}

languageSelector.click(function () {
  updateLanguage()
  return false
})

metadataLink.click(function () {
  window.location.href = 'metadata.html'
  return false
})

downloadLink.click(function () {
  window.location.href = 'download.html'
  return false
})

function updateLanguage() {
  if (getCurrentLocale() == LOCALE.FINNISH) {
    changeLocale(LOCALE.ENGLISH)
    setTranslations()
  } else {
    changeLocale(LOCALE.FINNISH)
    setTranslations()
  }
}

setTranslations()
