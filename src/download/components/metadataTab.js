import $ from 'jquery'

import datasets from '../datasets'
import { flipURN } from '../../shared/utils'
import { getCurrentLocale, translate } from '../../shared/translations'
import { LOCALE } from '../../shared/constants'
import { URL } from '../../shared/urls'

function init(metadataTabContentRoot) {
  const metadataURN = datasets.getCurrent().meta
  const metadataInfoLabel = $('<div>', {
    id: 'metadata-info-label',
  })
  if (metadataURN !== null) {
    metadataInfoLabel.append(
      translate('info.metadatainfo').replace(
        '!metadata_url!',
        URL.ETSIN_METADATA_BASE + flipURN(metadataURN)
      )
    )
    metadataTabContentRoot.append(metadataInfoLabel)
  }

  const errorFunction = (metadataNotes) => {
    metadataNotes.html(translate('info.nometadataavailable'))
    metadataTabContentRoot.append(metadataNotes)
  }

  const successFunction = (rawEtsinMetadata, metadataNotes) => {
    const notesHtml = getNotesAsHtmlFromEtsinMetadata(rawEtsinMetadata)
    const linksHtml = getLinksAsHtmlFromEtsinMetadata(rawEtsinMetadata)
    if (rawEtsinMetadata == null || notesHtml == null) {
      metadataNotes.html(translate('info.nometadataavailable'))
    } else {
      metadataNotes.html(
        translate('info.metadatacontentheader') + notesHtml + linksHtml
      )
    }
    if (metadataTabContentRoot.children().length >= 2) {
      metadataTabContentRoot.children().last().remove()
    }
    metadataTabContentRoot.append(metadataNotes)
  }

  const metadataNotes = $('<div>', {
    id: 'metadata-notes',
  })

  fetchMetadataDescription(
    metadataURN,
    metadataNotes,
    successFunction,
    errorFunction
  )
}

// Get dataset's metadata file links from Metax
function getLinksAsHtmlFromEtsinMetadata(rawEtsinMetadata) {
  if (rawEtsinMetadata != null) {
    const hasFileLink = (metadata) =>
      metadata.title != null &&
      metadata.download_url.identifier
        .toLowerCase()
        .includes('latauspalvelu') === false
    const toHtmlLink = (metadata) =>
      '<li><a href="' +
      metadata.download_url.identifier +
      '" target="_blank">' +
      metadata.title +
      '</a></li>'
    const htmlLinks = rawEtsinMetadata.research_dataset.remote_resources
      .filter(hasFileLink)
      .map(toHtmlLink)

    if (htmlLinks.length > 0) {
      return (
        '<br>' +
        translate('info.metadatalinksheader') +
        '<ul>' +
        htmlLinks +
        '</ul>'
      )
    }
  }
  return null
}

// Get dataset's metadata description from Metax
function getNotesAsHtmlFromEtsinMetadata(rawEtsinMetadata) {
  if (rawEtsinMetadata != null) {
    let notes =
      getCurrentLocale() == LOCALE.FINNISH
        ? rawEtsinMetadata.research_dataset.description.fi
        : rawEtsinMetadata.research_dataset.description.en
    if (notes == null) {
      return null
    }
    // Fix links from MarkDown to HTML
    const regexp = /\[.*?\]\(http.*?\)/g
    const matches = []

    let match
    while ((match = regexp.exec(notes)) != null) {
      matches.push(match.index)
    }
    matches.reverse()

    const insert = (string, index, value) => {
      return index > 0
        ? string.substring(0, index) +
            value +
            string.substring(index, string.length)
        : value + string
    }

    $.each(matches, (loopIdx, matchIdx) => {
      notes = insert(
        notes,
        matchIdx + 1,
        '<b><a href="' +
          notes.substring(
            notes.indexOf('(', matchIdx) + 1,
            notes.indexOf(')', matchIdx)
          ) +
          '" target="_blank">'
      )
      notes = insert(notes, notes.indexOf(']', matchIdx), '</a></b>')
      notes = notes.replace(
        notes.substring(
          notes.indexOf('(', matchIdx),
          notes.indexOf(')', matchIdx) + 1
        ),
        ''
      )
    })
    notes = notes.replace(/\[|\]/g, '')

    // Fix new lines from MarkDown to HTML
    return notes.replace(/(\r\n|\n|\r)/gm, '<br>')
  }
  return null
}

function fetchMetadataDescription(
  metadataURN,
  metadataNotes,
  successFn,
  errorFn
) {
  $.ajax({
    url: URL.ETSIN_METADATA_JSON_BASE + flipURN(metadataURN),
    success: (data) => successFn(data, metadataNotes),
    error: () => errorFn(metadataNotes),
  })
}

export default {
  init,
}
