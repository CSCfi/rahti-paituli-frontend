import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'
import 'bootstrap-table/dist/bootstrap-table'
import 'bootstrap-table/dist/bootstrap-table-locale-all'

import Translator from './translator'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import './metadata.css'

const METADATA_API_URL = '/api/datasets'

const currentLocale = 'fi_FI'
const translator = new Translator(currentLocale)

function flipURN(urn) {
  const colon = ':'
  const dash = '-'
  if (!urn.includes(colon)) {
    return urn
      .split(dash)
      .reduce(
        (acc, value, i, arr) =>
          acc + (i < arr.length - 1 ? colon : dash) + value
      )
  }
  return urn
}

const filterControlPlaceholder = translator.getVal('metadataTable.filter')
$('#table').bootstrapTable({
  url: METADATA_API_URL,
  filterControl: true,
  showMultiSort: true,
  sortPriority: [
    {
      sortName: 'org',
      sortOrder: 'asc',
    },
    {
      sortName: 'name',
      sortOrder: 'asc',
    },
    {
      sortName: 'year',
      sortOrder: 'asc',
    },
  ],
  columns: [
    {
      field: 'org',
      title: translator.getVal('metadataTable.producer'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'name',
      title: translator.getVal('metadataTable.name'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'scale',
      title: translator.getVal('metadataTable.scale'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'year',
      title: translator.getVal('metadataTable.year'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'format',
      title: translator.getVal('metadataTable.format'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'coord_sys',
      title: translator.getVal('metadataTable.coordSys'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'access',
      title: translator.getVal('metadataTable.download'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
      formatter: (value, row) => {
        return value === 1
          ? '<a href="/index.html?data_id=' +
              row.data_id +
              '">' +
              translator.getVal('metadataTable.access') +
              '</a>'
          : '<a href="/index.html?data_id="' + row.data_id + '">HAKA</a>'
      },
    },
    {
      field: 'meta',
      title: translator.getVal('metadataTable.description'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
      formatter: (value) =>
        value != null
          ? '<a href="http://urn.fi/' +
            flipURN(value) +
            '">' +
            translator.getVal('metadataTable.description') +
            '</a>'
          : '-',
    },
  ],
})
