import $ from 'jquery'

import { translate } from '../shared/translations'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import '../../css/main.css'
import '../../css/ftpsync.css'
$(function () {
  $('#header').load('header.html')
  $('.row').html(translate('ftprsync.content'))
  $('#footer').load('footer.html')
})
