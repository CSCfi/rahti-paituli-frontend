import $ from 'jquery'
import 'jquery-ui-bundle/jquery-ui'

import { translate } from './translations'

import '../../css/main.css'
import '../../css/footer.css'

function setTranslations() {
  $('#footer-text').text(translate('footer.text'))
  $('#okm-logo').attr('src', translate('footer.ministryLogo'))
  $('#avoin-logo').attr('src', translate('footer.avoinLogo'))
}

setTranslations()
