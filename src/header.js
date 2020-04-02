import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

// import Translator from './translator'

import './header.css'

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

const FINNISH_LANGUAGE = 'fi_FI'
// const ENGLISH_LANGUAGE = 'en_US'

let currentLocale = FINNISH_LANGUAGE
// let translator = new Translator(currentLocale)

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
  console.log(currentLocale)
  // TODO: STORE IN LOCAL BROWSER STORAGE
  //   if (currentLocale == FINNISH_LANGUAGE) {
  //     currentLocale = ENGLISH_LANGUAGE
  //   } else {
  //     currentLocale = FINNISH_LANGUAGE
  //   }
  //   translator = new Translator(currentLocale)
}
