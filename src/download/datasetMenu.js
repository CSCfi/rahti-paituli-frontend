import $ from 'jquery'

import auth from '../shared/auth'
import datasets from './datasets'
import { translate } from '../shared/translations'

function init(updateMapCallback, datasetId) {
  const rootElem = $('#form-input-container')
  const producerInputId = 'producer-input'
  const dataInputId = 'data-input'
  const scaleInputId = 'scale-input'
  const yearInputId = 'year-input'
  const formatInputId = 'format-input'
  const coordsysInputId = 'coordsys-input'

  const producerInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'producer-row',
  })
  const producerLabel = $('<div>', {
    class: 'form-input-label',
    id: 'producer-label',
  })
  producerLabel.append(translate('data.producer'))

  const producerInput = $('<select>', {
    class: 'form-input',
    id: producerInputId,
  })
  producerLabel.appendTo(producerInputRow)
  producerInput.appendTo(producerInputRow)

  const dataInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'data-row',
  })
  const dataLabel = $('<div>', {
    class: 'form-input-label',
    id: 'data-label',
  })
  dataLabel.append(translate('data.data'))

  const dataInput = $('<select>', {
    class: 'form-input',
    id: dataInputId,
  })
  dataLabel.appendTo(dataInputRow)
  dataInput.appendTo(dataInputRow)

  const scaleInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'scale-row',
  })
  const scaleLabel = $('<div>', {
    class: 'form-input-label',
    id: 'scale-label',
  })
  scaleLabel.append(translate('data.scale'))
  const scaleInput = $('<select>', {
    class: 'form-input',
    id: scaleInputId,
  })
  scaleLabel.appendTo(scaleInputRow)
  scaleInput.appendTo(scaleInputRow)

  const yearInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'year-row',
  })
  const yearLabel = $('<div>', {
    class: 'form-input-label',
    id: 'year-label',
  })
  yearLabel.append(translate('data.year'))
  const yearInput = $('<select>', {
    class: 'form-input',
    id: yearInputId,
  })
  yearLabel.appendTo(yearInputRow)
  yearInput.appendTo(yearInputRow)

  const formatInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'format-row',
  })
  const formatLabel = $('<div>', {
    class: 'form-input-label',
    id: 'format-label',
  })
  formatLabel.append(translate('data.format'))
  const formatInput = $('<select>', {
    class: 'form-input',
    id: formatInputId,
  })
  formatLabel.appendTo(formatInputRow)
  formatInput.appendTo(formatInputRow)

  const coordsysInputRow = $('<article>', {
    class: 'form-input-row',
    id: 'coordsys-row',
  })
  const coordsysLabel = $('<div>', {
    class: 'form-input-label',
    id: 'coordsys-label',
  })
  coordsysLabel.append(translate('data.coordSys'))
  const coordsysInput = $('<select>', {
    class: 'form-input',
    id: coordsysInputId,
  })
  coordsysLabel.appendTo(coordsysInputRow)
  coordsysInput.appendTo(coordsysInputRow)

  producerInputRow.appendTo(rootElem)
  dataInputRow.appendTo(rootElem)
  scaleInputRow.appendTo(rootElem)
  yearInputRow.appendTo(rootElem)
  formatInputRow.appendTo(rootElem)
  coordsysInputRow.appendTo(rootElem)

  $('#' + producerInputId).on('change', () =>
    updateDatasets(producerInput, dataInput)
  )
  $('#' + dataInputId).on('change', () =>
    updateScales(producerInput, dataInput, scaleInput)
  )
  $('#' + scaleInputId).on('change', () =>
    updateYears(producerInput, dataInput, scaleInput, yearInput)
  )
  $('#' + yearInputId).on('change', () =>
    updateFormats(producerInput, dataInput, scaleInput, yearInput, formatInput)
  )
  $('#' + formatInputId).on('change', () =>
    updateCoordsyses(
      producerInput,
      dataInput,
      scaleInput,
      yearInput,
      formatInput,
      coordsysInput
    )
  )
  $('#' + coordsysInputId).on('change', () => {
    const selectedData = datasets
      .getAll()
      .find(
        (data) =>
          data.org === producerInput.val() &&
          data.name === dataInput.val() &&
          data.scale === scaleInput.val() &&
          data.year === yearInput.val() &&
          data.format === formatInput.val() &&
          data.coord_sys === coordsysInput.val()
      )
    if (typeof selectedData !== 'undefined') {
      datasets.setCurrent(selectedData.data_id)
    } else {
      datasets.clearCurrent()
    }
    updateMapCallback()
  })

  updateProducers(producerInput)

  if (datasetId !== null) {
    selectDataset(
      datasetId,
      producerInput,
      dataInput,
      scaleInput,
      yearInput,
      formatInput,
      coordsysInput
    )
  }
}

function selectDataset(
  datasetId,
  producerInput,
  dataInput,
  scaleInput,
  yearInput,
  formatInput,
  coordsysInput
) {
  const selectedData = datasets.getById(datasetId)
  if (typeof selectedData !== 'undefined') {
    producerInput.val(selectedData.org)
    producerInput.trigger('change')
    dataInput.val(selectedData.name)
    dataInput.trigger('change')
    scaleInput.val(selectedData.scale)
    scaleInput.trigger('change')
    yearInput.val(selectedData.year)
    yearInput.trigger('change')
    formatInput.val(selectedData.format)
    formatInput.trigger('change')
    coordsysInput.val(selectedData.coord_sys)
    coordsysInput.trigger('change')
  }
}

function updateProducers(producerInput) {
  const producers = datasets
    .getAll()
    .filter(onlyAuthorized)
    .map((data) => data.org)
    .filter(onlyDistinct)
  updateOptions(producerInput, sortDropdownData('ascending', producers), true)
}

function updateDatasets(producerInput, dataInput) {
  if (!producerInput.val().startsWith('--')) {
    const names = datasets
      .getAll()
      .filter((data) => data.org === producerInput.val())
      .filter(onlyAuthorized)
      .map((data) => data.name)
      .filter(onlyDistinct)
    updateOptions(dataInput, sortDropdownData('ascending', names), false)
  } else {
    addEmptyOption(dataInput)
  }
}

function updateScales(producerInput, dataInput, scaleInput) {
  if (!dataInput.val().startsWith('--')) {
    const scales = datasets
      .getAll()
      .filter((data) => data.org === producerInput.val())
      .filter((data) => data.name === dataInput.val())
      .map((data) => data.scale)
      .filter(onlyDistinct)
    updateOptions(scaleInput, sortDropdownData('shortest', scales), false)
  } else {
    addEmptyOption(scaleInput)
  }
}

function updateYears(producerInput, dataInput, scaleInput, yearInput) {
  if (!scaleInput.val().startsWith('--')) {
    const years = datasets
      .getAll()
      .filter((data) => data.org === producerInput.val())
      .filter((data) => data.name === dataInput.val())
      .filter((data) => data.scale === scaleInput.val())
      .map((data) => data.year)
      .filter(onlyDistinct)
    updateOptions(yearInput, sortDropdownData('newest', years), false)
  } else {
    addEmptyOption(yearInput)
  }
}

function updateFormats(
  producerInput,
  dataInput,
  scaleInput,
  yearInput,
  formatInput
) {
  if (!yearInput.val().startsWith('--')) {
    const formats = datasets
      .getAll()
      .filter((data) => data.org === producerInput.val())
      .filter((data) => data.name === dataInput.val())
      .filter((data) => data.scale === scaleInput.val())
      .filter((data) => data.year === yearInput.val())
      .map((data) => data.format)
      .filter(onlyDistinct)
    updateOptions(formatInput, sortDropdownData('ascending', formats), false)
  } else {
    addEmptyOption(formatInput)
  }
}

function updateCoordsyses(
  producerInput,
  dataInput,
  scaleInput,
  yearInput,
  formatInput,
  coordsysInput
) {
  if (!formatInput.val().startsWith('--')) {
    const coordsyses = datasets
      .getAll()
      .filter((data) => data.org === producerInput.val())
      .filter((data) => data.name === dataInput.val())
      .filter((data) => data.scale === scaleInput.val())
      .filter((data) => data.year === yearInput.val())
      .filter((data) => data.format === formatInput.val())
      .map((data) => data.coord_sys)
      .filter(onlyDistinct)
    updateOptions(
      coordsysInput,
      sortDropdownData('ascending', coordsyses),
      false
    )
  } else {
    addEmptyOption(coordsysInput)
  }
}

function onlyDistinct(value, index, self) {
  return self.indexOf(value) === index
}

function onlyAuthorized(data) {
  return auth.loggedIn() || data.access === 1
}

function addEmptyOption(inputElem) {
  inputElem.empty()
  const title = '--'
  const optionElem = $('<option>', {
    value: title,
  })
  optionElem.text(title)
  inputElem.append(optionElem)
  inputElem.prop('disabled', true)
  inputElem.val($('#' + inputElem.attr('id') + ' option:first').val()).change()
}

function updateOptions(inputElem, optionNames, isProducerInput, optionIds) {
  if (optionIds === undefined) {
    optionIds = null
  }
  inputElem.empty()
  inputElem.prop('disabled', false)
  if (isProducerInput) {
    let title = translate('data.selectProducer')
    const optionElem = $('<option>', {
      value: title,
    })
    optionElem.text(title)
    inputElem.append(optionElem)
  }
  optionNames.forEach((value, idx) => {
    const optionElem = $('<option>', {
      value: value,
    })
    optionElem.text(value)
    if (optionIds !== null) {
      optionElem.attr('id', optionIds[idx])
    }
    inputElem.append(optionElem)
  })

  if (inputElem.find('option').length <= 1) {
    inputElem.prop('disabled', true)
  }
  inputElem.val($('#' + inputElem.attr('id') + ' option:first').val()).change()
}

function sortDropdownData(type, data) {
  switch (type) {
    case 'ascending':
      data.sort()
      break
    case 'newest': // Used for dates
      data.sort((a, b) => {
        const c = fixDropDownItemForOrdering(a)
        const d = fixDropDownItemForOrdering(b)
        return d - c
      })
      break
    case 'shortest':
      // Used for scales
      // The scales are basicallly ordered in numeric order from smaller
      // to bigger.

      data.sort((a, b) => {
        const c = fixDropDownItemForOrdering(a)
        const d = fixDropDownItemForOrdering(b)
        return c - d
      })
      break
    default:
      return null
  }
  return data
}

function fixDropDownItemForOrdering(label) {
  let d
  // Split is for cases like: 1:10 000, 25mx25m, "1:20 000, 1:50 000",
  // 2015-2017.
  // Count only with the last number.
  if (label.search(/[?,:.xX-]+/) != -1) {
    let parts = label.split(/[?,:.xX-]+/g)
    d = parts[parts.length - 1]
  } else {
    d = label
  }
  // Remove anything non-numeric
  d = d.replace(/\D/g, '')
  return d
}

export default {
  init,
}
