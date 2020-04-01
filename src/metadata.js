import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'
import 'bootstrap-table/dist/bootstrap-table'
import 'bootstrap-table/dist/bootstrap-table-locale-all'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import 'ol/ol.css'
import 'ol-layerswitcher/src/ol-layerswitcher.css'
import './metadata.css'

const METADATA_API_URL = '/api/datasets'

var translations = translator('fi_FI')

function flipURN(urn) {
  var colon = ':'
  if (urn.indexOf(colon) == -1) {
    var dash = '-'
    var arr = urn.split(dash)
    urn =
      arr[0] + colon + arr[1] + colon + arr[2] + colon + arr[3] + dash + arr[4]
  }

  return urn
}

function translator(lang) {
  var translations = []

  if (lang === 'en-US') {
    translations = [
      'Tuottaja',
      'Ainesto',
      'Mittakaava',
      'Vuosi',
      'Formaatti',
      'CRS',
      'Kuvaus',
      'Lisenssi',
      'Lataus',
      'Avoin',
      'Rajaa tuloksia',
    ]
  } else {
    translations = [
      'Producer',
      'Dataset',
      'Scale',
      'Year',
      'Format',
      'CRS',
      'Description',
      'License',
      'Download',
      'Open',
      'Filter results',
    ]
  }

  return translations
}

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
      title: translations[0],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'name',
      title: translations[1],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'scale',
      title: translations[2],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'year',
      title: translations[3],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'format',
      title: translations[4],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'coord_sys',
      title: translations[5],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
    },
    {
      field: 'access',
      title: translations[8],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
      formatter: function (value, row) {
        var link = ''

        if (value == 1) {
          link =
            "<a href='/web/paituli/latauspalvelu?data_id=" +
            row.data_id +
            "'>" +
            translations[9] +
            '</a>'
        } else {
          link =
            "<a href='/web/paituli/latauspalvelu?data_id=" +
            row.data_id +
            "'>HAKA</a>"
        }

        return link
      },
    },
    {
      field: 'meta',
      title: translations[6],
      sortable: true,
      filterControl: 'input',
      filterControlPlaceholder: translations[10],
      formatter: function (value) {
        return value != null
          ? '<a href="http://urn.fi/' +
              flipURN(value) +
              '">' +
              translations[6] +
              '</a>'
          : '-'
      },
    },
  ],
})
