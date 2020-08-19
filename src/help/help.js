import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import { translate } from '../shared/translations'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-bundle/jquery-ui.css'
import '../../css/main.css'

$(function () {
  $('#header').load('header.html')
  $('.row').html(translate('help.content'))
  $('#footer').load('footer.html', function () {
    $('.body_container').show()
  })
})
