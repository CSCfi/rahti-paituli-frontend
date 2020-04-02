export default function Translator(language) {
  const translations = {
    appHeader: {
      fi_FI: 'PaITuli - Paikkatietoja tutkimukseen ja opetukseen',
      en_US: 'PaITuli - Spatial data for research and teaching',
    },
    data: {
      header: {
        fi_FI: 'Valitse aineisto:',
        en_US: 'Select dataset:',
      },
      producer: {
        fi_FI: 'Tuottaja:',
        en_US: 'Producer:',
      },
      selectProducer: {
        fi_FI: '--Valitse aineistotuottaja--',
        en_US: '--Select data producer--',
      },
      data: {
        fi_FI: 'Aineisto:',
        en_US: 'Data:',
      },
      scale: {
        fi_FI: 'Mittakaava:',
        en_US: 'Scale:',
      },
      year: {
        fi_FI: 'Vuosi:',
        en_US: 'Year:',
      },
      format: {
        fi_FI: 'Formaatti:',
        en_US: 'Format:',
      },
      coordSys: {
        fi_FI: 'Koordinaatisto:',
        en_US: 'Coordinate system:',
      },
      metadata: {
        fi_FI: 'Metatiedot',
        en_US: 'Metadata',
      },
      search: {
        fi_FI: 'Hae karttalehtiä',
        en_US: 'Search mapsheets',
      },
      searchresult: {
        fi_FI: 'Löydettiin !features! karttalehteä',
        en_US: 'Found !features! map sheets',
      },
      toomanyresults: {
        fi_FI: 'Löydettiin liian monta karttalehteä. Rajaa hakua tarkemmaksi.',
        en_US: 'Found too many map sheets. Please search more specifically.',
      },
    },
    info: {
      download: {
        fi_FI: 'Lataa aineisto zip tiedostona',
        en_US: 'Download dataset as zip file',
      },
      downloadlist: {
        fi_FI: 'Lataa tiedostolista',
        en_US: 'Download list of files',
      },
      downloadTooltip: {
        fi_FI:
          'Ladattavan zip tiedoston enimmäsikoko on 3GB. Suuremmilla aineistoilla lataa tiedostolista ja lataa aineisto ftp:n tai rsyncin avulla.',
        en_US:
          'Limit for downloading as a zip file is 3GB. For larger datasets download file list and use ftp/rsync',
      },
      dlListTooltip: {
        fi_FI:
          'Lataa lista valituista tiedostoista polkuineen. Listan avulla voit ladata tiedostot esimerkiksi FTP:n tai rsyncin avulla. Ladattavien tiedostojen määrässä ei ole 3GB rajoitusta. Lisätietoja FTP ja rsync sivulta.',
        en_US:
          "Download a list of selected files including paths. You can use the list to download files using FTP or rsync. There isn't download size limit for this method. See FTP and rsync page for details",
      },
      dlIndexMapInfo: {
        fi_FI:
          'Tiedosto sisältää kaikkien karttalehtien nimet, polut ja geometrian.',
        en_US: 'The shapefile contains names, paths and geometry of mapsheets.',
      },
      files: {
        fi_FI: 'Tiedostot',
        en_US: 'Files',
      },
      documents: {
        fi_FI: 'Dokumentit',
        en_US: 'Documents',
      },
      licence: {
        fi_FI: 'Käyttöehdot',
        en_US: 'Licence terms',
      },
      downloadindex: {
        fi_FI: 'Indeksikartta Shape formaatissa.',
        en_US: 'Indexmap as a Shape file.',
      },
      info: {
        fi_FI:
          'Valitse karttalehdet kartalta tai hae karttalehtia nimen perusteella. Karttalehtien valitsemiksi kartalta aktivoi ensin karttalehtien valinnan työkalu ja raaha kartalle sopivaan paikkaan nelikulmio tai klikkaa kartalla tarvitsemasi karttalehtiä. Jo valittuja karttalehtiä voi poistaa valinnasta valitsemalla niitä uudestaan.',
        en_US:
          'Select area of interest from the map or search map sheets by name. For selecting map sheets from the map first activate the map sheets selection tool and then draw a rectangle to a suitable area or click map sheets one by one. Already selected map sheets may be removed from selection by selecting them again.',
      },
      downloadtab: {
        fi_FI: 'Ladattavat tiedostot',
        en_US: 'Files for download',
      },
      featureinfotab: {
        fi_FI: 'Kohdetiedot',
        en_US: 'Feature info',
      },
      metadatatab: {
        fi_FI: 'Metatiedot',
        en_US: 'Metadata',
      },
      linkstab: {
        fi_FI: 'Linkit',
        en_US: 'Links',
      },
      metadatainfo: {
        fi_FI:
          "Tämän aineiston <b>kaikki metatiedot</b> löytyvät <a href='!metadata_url!' target='_blank'>" +
          'Etsin-hakupalvelusta</a>.',
        en_US:
          "<b>All metadata</b> for this dataset is available from <a href='!metadata_url!' target='_blank'>Etsin metadata service</a>.",
      },
      metadatacontentheader: {
        fi_FI: '<h6>Aineiston kuvaus</h6>',
        en_US: '<h6>Description of dataset</h6>',
      },
      metadatalinksheader: {
        fi_FI: '<h6>Aineistoa kuvaavat tiedostot</h6>',
        en_US: '<h6>Files describing the dataset</h6>',
      },
      nometadataavailable: {
        fi_FI: 'Aineiston kuvaus ei ole saatavilla',
        en_US: 'Dataset description not available',
      },
      featureinfodefault: {
        fi_FI: 'Valitse Info-työkalu ja klikkaa karttaa',
        en_US: 'Select Info tool and click on map',
      },
      maxfeaturewarning: {
        fi_FI:
          'Latauksen kokorajoitus on 3 GB. Korkeintaan !maxFeatures! karttalehteä voidaan valita.',
        en_US:
          'Download limit is 3 GB. Maximum of !maxFeatures! map sheets may be selected.',
      },
      linksHeader: {
        fi_FI: 'Rsync/FTP/HTTP linkit aineistoon:',
        en_US: 'Rsync/FTP/HTTP links to dataset:',
      },
      linksInfo: {
        fi_FI:
          "Lisätietoja <a target='_blank' href=!infolink!>FTP ja rsync sivulta</a>.",
        en_US:
          "Additional info: <a target='_blank' href=!infolink!>FTP and rsync page</a>.",
      },
      linksIntro: {
        fi_FI:
          'Ladataksesi kokonaisia aineistoja tai selataksesi aineiston tiedostoja käytä alla olevia linkkejä:',
        en_US:
          'For downloading the full dataset or viewing the files included please use these links:',
      },
    },
    map: {
      basemap: {
        fi_FI: 'Taustakartta',
        en_US: 'Background map',
      },
      indexmap: {
        fi_FI: 'Indeksikartta',
        en_US: 'Index map',
      },
      datamap: {
        fi_FI: 'Aineisto',
        en_US: 'Data',
      },
      catchment: {
        fi_FI: 'Valuma-alueet',
        en_US: 'Catchment areas',
      },
      municipalitiesmap: {
        fi_FI: 'Kuntajako',
        en_US: 'Municipalities',
      },
      reset: {
        fi_FI: 'Näytä koko Suomi',
        en_US: 'Zoom to Finland',
      },
      pan: {
        fi_FI: 'Siirrä karttaa hiirellä raahaamalla',
        en_US: 'Pan, move the map with dragging the mouse',
      },
      select: {
        fi_FI:
          'Valitse karttalehtiä kartalta, raahaamalla nelikulmio tai klikkaamalla',
        en_US:
          'Select map sheets from the map by drawing a rectangle or clicking',
      },
      info: {
        fi_FI: 'Info, katso kohteiden ominaisuustietoja klikkaamalla',
        en_US: 'Info, see attribute data by clicking',
      },
      clearSelection: {
        fi_FI: 'Poista kaikki karttalehdet valinnasta',
        en_US: 'Deselect all map sheets',
      },
      draw: {
        fi_FI: 'Valitse karttalehtiä piirtämällä',
        en_US: 'Select map sheets by drawing',
      },
      dataAvailabilityWarning: {
        fi_FI: 'Aineiston esikatselu ei ole saatavilla',
        en_US: 'Data preview is not available',
      },
      resolutionwarning: {
        fi_FI: 'Lähennä karttaa nähdäksesi aineiston',
        en_US: 'Zoom in to see the data',
      },
      locationsearch: {
        fi_FI: 'Etsi sijaintia...',
        en_US: 'Search for a location...',
      },
      locationNotFound: {
        fi_FI: 'Annetulla haulla ei löytynyt sijantia',
        en_US: 'The provided query did not find any related location',
      },
    },
    email: {
      modalheader: {
        fi_FI: 'Lähetä latauslinkki sähköpostiini',
        en_US: 'Send data download link to my e-mail',
      },
      modalheaderList: {
        fi_FI: 'Lähetä tiedostolistaus sähköpostiini',
        en_US: 'Send file list to my e-mail',
      },
      datasetinfo: {
        fi_FI: 'Valittu aineisto',
        en_US: 'Selected dataset',
      },
      inputsheader: {
        fi_FI: 'Tiedot lataamista varten',
        en_US: 'Information for downloading',
      },
      emailfield: {
        fi_FI: 'Sähköpostiosoite',
        en_US: 'E-mail',
      },
      emailfieldPlaceholder: {
        fi_FI: 'esim@toinen.fi',
        en_US: 'example@other.com',
      },
      licencefield: {
        fi_FI:
          "Hyväksyn aineiston <a href='!licence!' target='_blank'>käyttöehdot</a>",
        en_US:
          "I accept the <a href='!licence!' target='_blank'>licence terms</a>",
      },
      info: {
        fi_FI:
          'Lähetettyäsi tilauksen saat hetken kuluttua sähköpostiisi latauslinkin.',
        en_US:
          'In a moment after sending the download order, you will receive an e-mail with a download link.',
      },
      infoList: {
        fi_FI:
          'Lähetettyäsi tilauksen saat hetken kuluttua sähköpostiisi tiedostolistan.',
        en_US:
          'In a moment after sending the order, you will receive an e-mail with a file list.',
      },
      sendButton: {
        fi_FI: 'Lähetä latauslinkki sähköpostiini',
        en_US: 'Send data download link to my e-mail',
      },
      sendButtonList: {
        fi_FI: 'Lähetä tiedostolista sähköpostiini',
        en_US: 'Send file list link to my e-mail',
      },
      cancelButton: {
        fi_FI: 'Peruuta',
        en_US: 'Cancel',
      },
      errorEmailLength: {
        fi_FI: 'Sähköpostiosoite puuttuu',
        en_US: 'E-mail is missing',
      },
      errorEmailFormat: {
        fi_FI: 'Virheellinen sähköpostiosoite',
        en_US: 'E-mail address invalid',
      },
      errorCheckboxChecked: {
        fi_FI: 'Käyttöehtojen hyväksyminen on pakollista',
        en_US: 'Accepting the licence terms is mandatory',
      },
    },
    metadataTable: {
      producer: {
        fi_FI: 'Tuottaja',
        en_US: 'Producer',
      },
      name: {
        fi_FI: 'Aineisto',
        en_US: 'Dataset',
      },
      scale: {
        fi_FI: 'Mittakaava',
        en_US: 'Scale',
      },
      year: {
        fi_FI: 'Vuosi',
        en_US: 'Year',
      },
      format: {
        fi_FI: 'Formaatti',
        en_US: 'Format',
      },
      coordSys: {
        fi_FI: 'CRS',
        en_US: 'CRS',
      },
      description: {
        fi_FI: 'Kuvaus',
        en_US: 'Description',
      },
      license: {
        fi_FI: 'Lisenssi',
        en_US: 'License',
      },
      download: {
        fi_FI: 'Lataus',
        en_US: 'Download',
      },
      access: {
        fi_FI: 'Avoin',
        en_US: 'Open',
      },
      filter: {
        fi_FI: 'Rajaa tuloksia',
        en_US: 'Filter results',
      },
    },
  }

  const byString = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    s = s.replace(/^\./, '') // strip a leading dot
    const a = s.split('.')
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i]
      if (k in o) {
        o = o[k]
      } else {
        return
      }
    }
    return o
  }

  this.getVal = (field) => byString(translations, field + '.' + language)
}
