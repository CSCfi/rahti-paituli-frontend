import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import 'bootstrap-table/dist/bootstrap-table'
import 'bootstrap-table/dist/bootstrap-table-locale-all'
import 'bootstrap-table/dist/extensions/multiple-sort/bootstrap-table-multiple-sort'
import 'bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control'

// import { translate } from '../shared/translations'
// import { URL } from '../shared/urls'
// import { getCurrentLocale } from '../shared/translations'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import '../../css/metadata.css'

// const filterControlPlaceholder = translate('metadataTable.filter')
// $('#table').bootstrapTable({
//   url: `${URL.METADATA_API}/${getCurrentLocale()}`,
//   filterControl: true,
//   showMultiSort: true,
//   sortPriority: [
//     {
//       sortName: 'org',
//       sortOrder: 'asc',
//     },
//     {
//       sortName: 'name',
//       sortOrder: 'asc',
//     },
//     {
//       sortName: 'year',
//       sortOrder: 'asc',
//     },
//   ],
//   columns: [

//     {
//       field: 'data_url',
//       title: translate('webservicesTable.dataUrl'),
//       sortable: true,
//       filterControl: 'input',
//       filterControlPlaceholder: filterControlPlaceholder,
//     },
//     {
//       field: 'scale',
//       title: translate('webservicesTable.heading'),
//       sortable: true,
//       filterControl: 'input',
//       filterControlPlaceholder: filterControlPlaceholder,
//     },
//     {
//       field: 'year',
//       title: translate('webservicesTable.scaleLimit'),
//       sortable: true,
//       filterControl: 'input',
//       filterControlPlaceholder: filterControlPlaceholder,
//     }
//   ],
// })

$(function () {
  $('#header').load('header.html')
  $('.row').html('<h1>TODO</h1>')
})
