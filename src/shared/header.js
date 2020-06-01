import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import { translate, getCurrentLocale, changeLocale } from './translations'
import { LOCALE } from './constants'

import '../../css/main.css'
import '../../css/header.css'

const languageSelector = $('#language-selector')
// const contactInitiator = $('#contact-initiator')
// const loginInitiator = $('#login-initiator')

const homeLink = $('#home-link')
const metadataLink = $('#metadata-link')
const downloadLink = $('#download-link')
const helpLink = $('#help-link')
const webServicesLink = $('#webservices-link')
const ftpLink = $('#ftp-link')
const openDataLink = $('#open-data-link')
const contactInfoLink = $('#contact-info-link')

function setTranslations() {
  $('#metadata-link').text(translate('header.metadataPage'))
  $('#download-link').text(translate('header.downloadPage'))
  $('#help-link').text(translate('header.helpPage'))
  $('#webservices-link').text(translate('header.webservicesPage'))
  $('#ftp-link').text(translate('header.ftpPage'))
  $('#open-data-link').text(translate('header.openDataPage'))
  $('#contact-info-link').text(translate('header.contactPage'))
  $('#contact-initiator').text(translate('header.contact'))
  $('#language-selector').text(translate('header.language'))
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
helpLink.click(function () {
  window.location.href = 'help.html'
  return false
})

webServicesLink.click(function () {
  window.location.href = 'webservices.html'
  return false
})
ftpLink.click(function () {
  window.location.href = 'ftprsync.html'
  return false
})
openDataLink.click(function () {
  window.location.href = 'opendata.html'
  return false
})
contactInfoLink.click(function () {
  window.location.href = 'contact.html'
  return false
})

homeLink.click(function () {
  window.location.href = 'home.html'
  return false
})

function updateLanguage() {
  if (getCurrentLocale() == LOCALE.FINNISH) {
    if (typeof Storage !== 'undefined') {
      localStorage.language = LOCALE.ENGLISH
      window.location.reload()
    }
  } else {
    changeLocale(LOCALE.FINNISH)
    if (typeof Storage !== 'undefined') {
      localStorage.language = LOCALE.FINNISH
      window.location.reload()
    }
  }
}

setTranslations()
