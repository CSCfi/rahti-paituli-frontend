import $ from 'jquery'

import datasets from './datasets'
import { translate, getCurrentLocale } from '../shared/translations'
import { DOWNLOAD_TYPE } from '../shared/constants'
import { URL } from '../shared/urls'

let filePaths = []
let fileLabels = []
let downloadType = ''

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const emailInput = $('#email-input')
const licenseCheckbox = $('#license-checkbox')
const tips = $('#email-modal-tips')
const modal = $('#email-modal').dialog({
  autoOpen: false,
  height: 'auto',
  width: 600,
  modal: true,
  closeOnEscape: true,
  draggable: true,
  resizable: false,
  close: () => {
    emailForm[0].reset()
    emailInput.removeClass('ui-state-error')
    licenseCheckbox.removeClass('ui-state-error')
  },
})

const emailForm = modal.find('form')
emailForm.on('submit', (event) => {
  event.preventDefault()
  sendEmail()
})

$('#email-input-label').text(translate('email.emailfield'))
$('#email-input').attr('placeholder', translate('email.emailfieldPlaceholder'))
$('#email-modal-form fieldset legend').text(translate('email.inputsheader'))
$('#email-instructions').text(translate('email.info'))

function sendEmail() {
  const emailVal = emailInput.val()
  if (filePaths.length > 0 && emailVal) {
    const current = datasets.getCurrent()
    const downloadRequest = {
      data_id: current.data_id,
      downloadType,
      email: emailVal,
      language: getCurrentLocale(),
      filePaths: filePaths,
      filenames: fileLabels,
      org: current.org,
      data: current.name,
      scale: current.scale,
      year: current.year,
      coord_sys: current.coord_sys,
      format: current.format,
    }

    // Validate input fields
    let valid = true
    emailInput.removeClass('ui-state-error')
    licenseCheckbox.removeClass('ui-state-error')
    valid =
      valid &&
      checkLength(emailInput, 1, 80, translate('email.errorEmailLength'), tips)
    valid =
      valid &&
      checkRegexp(
        emailInput,
        emailRegex,
        translate('email.errorEmailFormat'),
        tips
      )
    valid =
      valid &&
      checkIsChecked(
        licenseCheckbox,
        translate('email.errorCheckboxChecked'),
        tips
      )
    if (valid) {
      modal.data('email', emailInput.val())
      $.post({
        url: URL.DOWNLOAD_API,
        data: JSON.stringify(downloadRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: () => modal.dialog('close'),
      })
    }
    return valid
  } else {
    return false
  }
}

function checkLength(obj, min, max, errMsg, tipsOutput) {
  if (obj.val().length > max || obj.val().length < min) {
    obj.addClass('ui-state-error')
    updateModalTips(errMsg, tipsOutput)
    return false
  } else {
    return true
  }
}

function checkRegexp(obj, regexp, errMsg, tipsOutput) {
  if (!regexp.test(obj.val())) {
    obj.addClass('ui-state-error')
    updateModalTips(errMsg, tipsOutput)
    return false
  } else {
    return true
  }
}

function checkIsChecked(obj, errMsg, tipsOutput) {
  if (!obj.prop('checked')) {
    obj.addClass('ui-state-error')
    updateModalTips(errMsg, tipsOutput)
    return false
  } else {
    return true
  }
}

function initModal(downloadSize) {
  const currentDataset = datasets.getCurrent()
  const dataDescrContainer = $('#data-description')
  dataDescrContainer.empty()
  $('#license-checkbox-label').html(
    translate('email.licensefield').replace(
      '!license!',
      currentDataset.license_url
    )
  )
  const dataDescrContent = $('<div>')
  dataDescrContent.text(
    translate('email.datasetinfo') +
      ': ' +
      currentDataset.org +
      ', ' +
      currentDataset.name +
      ', ' +
      currentDataset.scale +
      ', ' +
      currentDataset.year +
      ', ' +
      currentDataset.coord_sys +
      ', ' +
      currentDataset.format +
      ': ' +
      downloadSize +
      ' Mb'
  )
  dataDescrContent.appendTo(dataDescrContainer)

  $('#email-modal-tips').empty()
  const email = modal.data('email')
  $('#email-input').val(email === null ? '' : email)

  modal.dialog('option', 'title', translate('email.modalheader'))
  modal.dialog('option', 'buttons', getModalButtons('email.sendButton'))
}

function updateModalTips(t, tipsOutput) {
  tipsOutput.text(t).addClass('ui-state-highlight')
  setTimeout(() => tipsOutput.removeClass('ui-state-highlight', 1500), 500)
}

function getModalButtons(submitLabel) {
  return [
    {
      text: translate(submitLabel),
      icons: {
        primary: 'ui-icon-mail-closed',
      },
      click: sendEmail,
      type: 'submit',
    },
    {
      text: translate('email.cancelButton'),
      icons: {
        primary: 'ui-icon-close',
      },
      click: () => modal.dialog('close'),
    },
  ]
}

function openDataModal(paths, labels, downloadSize) {
  filePaths = paths
  fileLabels = labels
  downloadType = DOWNLOAD_TYPE.ZIP
  initModal(
    downloadSize,
    translate('email.modalheader'),
    getModalButtons('email.sendButton')
  )
  modal.dialog('open')
}

function openListModal(paths, labels, downloadSize) {
  filePaths = paths
  fileLabels = labels
  downloadType = DOWNLOAD_TYPE.LIST
  initModal(
    downloadSize,
    translate('email.modalheaderList'),
    getModalButtons('email.sendButtonList')
  )
  modal.dialog('open')
}

const getEmail = () => modal.data('email')

export default {
  openDataModal,
  openListModal,
  getEmail,
}
