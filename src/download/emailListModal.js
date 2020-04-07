import $ from 'jquery'

import datasets from './datasets'
import { translate, getCurrentLocale } from '../shared/translations'
import { URL } from '../shared/urls'

let filePaths = []
let fileLabels = []

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const emailListInput = $('#email-list-input')
const licenseCheckboxList = $('#license-list-checkbox')
const listTips = $('#email-list-modal-tips')

const modal = $('#email-list-modal').dialog({
  autoOpen: false,
  height: 'auto',
  width: 600,
  modal: true,
  closeOnEscape: true,
  draggable: true,
  resizable: false,
  title: translate('email.modalheaderList'),
  buttons: [
    {
      text: translate('email.sendButtonList'),
      icons: {
        primary: 'ui-icon-mail-closed',
      },
      click: emailList,
      type: 'submit',
    },
    {
      text: translate('email.cancelButton'),
      icons: {
        primary: 'ui-icon-close',
      },
      click: () => $(this).dialog('close'),
    },
  ],
  close: () => {
    emailListForm[0].reset()
    emailListInput.removeClass('ui-state-error')
    licenseCheckboxList.removeClass('ui-state-error')
  },
})

const emailListForm = modal.find('form')
emailListForm.on('submit', (event) => {
  event.preventDefault()
  emailList()
})

function emailList() {
  return emailDataOrList(
    emailListInput,
    'list',
    licenseCheckboxList,
    modal,
    listTips
  )
}

function emailDataOrList(input, dlType, license, modal, tipsOutput) {
  const emailVal = input.val()
  if (filePaths.length > 0 && emailVal) {
    const current = datasets.getCurrent()
    const downloadRequest = {
      data_id: current.data_id,
      downloadType: dlType.toUpperCase(),
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
    input.removeClass('ui-state-error')
    license.removeClass('ui-state-error')
    valid =
      valid &&
      checkLength(input, 1, 80, translate('email.errorEmailLength'), tipsOutput)
    valid =
      valid &&
      checkRegexp(
        input,
        emailRegex,
        translate('email.errorEmailFormat'),
        tipsOutput
      )
    valid =
      valid &&
      checkIsChecked(
        license,
        translate('email.errorCheckboxChecked'),
        tipsOutput
      )

    if (valid) {
      modal.data('email', input.val())
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
    console.error('No email or file paths defined!')
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

function updateModalTips(t, tipsOutput) {
  tipsOutput.text(t).addClass('ui-state-highlight')
  setTimeout(() => tipsOutput.removeClass('ui-state-highlight', 1500), 500)
}

function open(paths, labels) {
  filePaths = paths
  fileLabels = labels
  modal.dialog('open')
}

const getEmail = () => modal.data('email')

export default {
  open,
  getEmail,
}
