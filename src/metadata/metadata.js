import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'
import 'bootstrap-table/dist/bootstrap-table'
import 'bootstrap-table/dist/bootstrap-table-locale-all'
import 'bootstrap-table/dist/extensions/multiple-sort/bootstrap-table-multiple-sort'
import 'bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control'

import { translate } from '../shared/translations'
import { flipURN } from '../shared/utils'
import { URL } from '../shared/urls'
import { getCurrentLocale } from '../shared/translations'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import '../../css/main.css'
import '../../css/metadata.css'

const filterControlPlaceholder = translate('metadataTable.filter')

$('#table').bootstrapTable({
  url: `${URL.METADATA_API}/${getCurrentLocale()}`,
  filterControl: true,
  locale: 'en-US',
  showMultiSort: false,
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
      title: translate('metadataTable.producer'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'name',
      title: translate('metadataTable.name'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'scale',
      title: translate('metadataTable.scale'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'year',
      title: translate('metadataTable.year'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'format',
      title: translate('metadataTable.format'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'coord_sys',
      title: translate('metadataTable.coordSys'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
    },
    {
      field: 'access',
      title: translate('metadataTable.download'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
      formatter: (value, row) => {
        return value === 1
          ? '<a href="/download.html?data_id=' +
              row.data_id +
              '">' +
              translate('metadataTable.access') +
              '</a>'
          : '<a href="/download.html?data_id="' + row.data_id + '">HAKA</a>'
      },
    },
    {
      field: 'meta',
      title: translate('metadataTable.description'),
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: filterControlPlaceholder,
      formatter: (value) =>
        value != null
          ? '<a href="http://urn.fi/' +
            flipURN(value) +
            '">' +
            translate('metadataTable.description') +
            '</a>'
          : '-',
    },
  ],
})

$(function () {
  $('#header').load('header.html')
  $('.content-placeholder').html(translate('metadata.content'))
  $('#footer').load('footer.html')
})
