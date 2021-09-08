import $ from 'jquery'

import datasets from '../../datasets'
import { getCurrentLocale, translate } from '../../../shared/translations'
import { LOCALE } from '../../../shared/constants'
import { URL } from '../../../shared/urls'

const TAB_ID = 'metadata-container'
const rootElem = $('#' + TAB_ID)

function init() {
  rootElem.empty()

  const urn = datasets.getCurrent().meta
  const infoLabel = $('<div>', {
    id: 'metadata-info-label',
  })
  if (urn !== null) {
    infoLabel.append(
      translate('info.metadatainfo').replace(
        '!metadata_url!',
        URL.ETSIN_METADATA_BASE + urn
      )
    )
    rootElem.append(infoLabel)
  }
  
  const notesDiv = $('<div>', {
    id: 'metadata-notesDiv',
  })

  fetchMetadataDescription(urn, notesDiv)
  
	const pidDiv = $('<div>', {
		id: 'metadata-pid',
	  })
	  if (urn !== null) {
		pidDiv.append(
		  translate('info.pid').replaceAll(
			'!metadata_url!',
			URL.ETSIN_METADATA_BASE + urn
		  )
		)
		rootElem.append(pidDiv)
	  }   
}

function fetchMetadataDescription(urn, notesDiv) {
  $.ajax({
    url: URL.ETSIN_METADATA_JSON_BASE + urn,
    success: (data) => {
      const notesHtml = getMetadataDescriptionFromMetax(data)
      const linksHtml = getMetadataFileLinksFromMetax(data)
      if (data == null || notesHtml == null) {
        notesDiv.html(translate('info.nometadataavailable'))
      } else {
        notesDiv.html(
          translate('info.metadatacontentheader') + notesHtml + linksHtml
        )
      }
      // if (rootElem.children().length >= 2) {
        // rootElem.children().last().remove()
      // }
      rootElem.append(notesDiv)
    },
    error: () => {
      notesDiv.html(translate('info.nometadataavailable'))
      rootElem.append(notesDiv)
    },
  })
}

function getMetadataFileLinksFromMetax(rawMetadata) {
  if (rawMetadata != null) {
    const hasFileLink = (metadata) =>
      metadata.title != null &&
      metadata.download_url.identifier
        .toLowerCase()
        .includes('paituli.csc.fi/download') === false
    const toHtmlLink = (metadata) =>
      '<li><a href="' +
      metadata.download_url.identifier +
      '" target="_blank">' +
      metadata.title +
      '</a></li>'
    const htmlLinks = rawMetadata.research_dataset.remote_resources
      .filter(hasFileLink)
      .map(toHtmlLink)
      .join('')
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
  return ''
}

function getMetadataDescriptionFromMetax(rawMetadata) {
  if (rawMetadata != null) {
    let notes =
      getCurrentLocale() == LOCALE.FINNISH
        ? rawMetadata.research_dataset.description.fi
        : rawMetadata.research_dataset.description.en
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

function insert(string, index, value) {
  return index > 0
    ? string.substring(0, index) +
        value +
        string.substring(index, string.length)
    : value + string
}

export default {
  TAB_ID,
  init,
}
