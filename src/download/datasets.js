import $ from 'jquery'

import { URL } from '../shared/urls'
import { getCurrentLocale } from '../shared/translations'

let datasets = []
let currentDataset = {}

function fetch() {
  return $.getJSON(`${URL.METADATA_API}/${getCurrentLocale()}`, (response) => {
    datasets = response
  })
}

const getAll = () => datasets
const getById = (id) => datasets.find((dataset) => dataset.data_id === id)
const hasCurrent = () => !$.isEmptyObject(currentDataset)
const hasFeatureInfo = () => currentDataset.data_url !== null
const getCurrent = () => currentDataset
const setCurrent = (id) => (currentDataset = getById(id))
const clearCurrent = () => (currentDataset = {})

export default {
  fetch,
  getById,
  getAll,
  hasCurrent,
  hasFeatureInfo,
  getCurrent,
  setCurrent,
  clearCurrent,
}
