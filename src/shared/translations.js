import { LOCALE } from './constants'

let locale =
  typeof localStorage.language == 'undefined'
    ? LOCALE.FINNISH
    : localStorage.language

const translations = {
  appHeader: {
    fi: 'PaITuli - Paikkatietoja tutkimukseen ja opetukseen',
    en: 'PaITuli - Spatial data for research and teaching',
  },
  data: {
    header: {
      fi: 'Valitse aineisto:',
      en: 'Select dataset:',
    },
    producer: {
      fi: 'Tuottaja:',
      en: 'Producer:',
    },
    selectProducer: {
      fi: '--Valitse aineistotuottaja--',
      en: '--Select data producer--',
    },
    data: {
      fi: 'Aineisto:',
      en: 'Data:',
    },
    scale: {
      fi: 'Mittakaava:',
      en: 'Scale:',
    },
    year: {
      fi: 'Vuosi:',
      en: 'Year:',
    },
    format: {
      fi: 'Formaatti:',
      en: 'Format:',
    },
    coordSys: {
      fi: 'Koordinaatisto:',
      en: 'Coordinate system:',
    },
    metadata: {
      fi: 'Metatiedot',
      en: 'Metadata',
    },
    search: {
      fi: 'Hae karttalehtiä',
      en: 'Search mapsheets',
    },
    searchresult: {
      fi: 'Löydettiin !features! karttalehteä',
      en: 'Found !features! map sheets',
    },
    toomanyresults: {
      fi: 'Löydettiin liian monta karttalehteä. Rajaa hakua tarkemmaksi.',
      en: 'Found too many map sheets. Please search more specifically.',
    },
  },
  info: {
    download: {
      fi: 'Lataa aineisto zip tiedostona',
      en: 'Download dataset as zip file',
    },
    downloadlist: {
      fi: 'Lataa tiedostolista',
      en: 'Download list of files',
    },
    downloadTooltip: {
      fi:
        'Ladattavan zip tiedoston enimmäsikoko on 3GB. Suuremmilla aineistoilla lataa tiedostolista ja lataa aineisto ftp:n tai rsyncin avulla.',
      en:
        'Limit for downloading as a zip file is 3GB. For larger datasets download file list and use ftp/rsync',
    },
    dlListTooltip: {
      fi:
        'Lataa lista valituista tiedostoista polkuineen. Listan avulla voit ladata tiedostot esimerkiksi FTP:n tai rsyncin avulla. Ladattavien tiedostojen määrässä ei ole 3GB rajoitusta. Lisätietoja FTP ja rsync sivulta.',
      en:
        "Download a list of selected files including paths. You can use the list to download files using FTP or rsync. There isn't download size limit for this method. See FTP and rsync page for details",
    },
    dlIndexMapInfo: {
      fi:
        'Tiedosto sisältää kaikkien karttalehtien nimet, polut ja geometrian.',
      en: 'The shapefile contains names, paths and geometry of mapsheets.',
    },
    files: {
      fi: 'Tiedostot',
      en: 'Files',
    },
    documents: {
      fi: 'Dokumentit',
      en: 'Documents',
    },
    license: {
      fi: 'Käyttöehdot',
      en: 'Licence terms',
    },
    downloadindex: {
      fi: 'Indeksikartta Shape formaatissa.',
      en: 'Indexmap as a Shape file.',
    },
    info: {
      fi:
        'Valitse karttalehdet kartalta tai hae karttalehtia nimen perusteella. Karttalehtien valitsemiksi kartalta aktivoi ensin karttalehtien valinnan työkalu ja raaha kartalle sopivaan paikkaan nelikulmio tai klikkaa kartalla tarvitsemasi karttalehtiä. Jo valittuja karttalehtiä voi poistaa valinnasta valitsemalla niitä uudestaan.',
      en:
        'Select area of interest from the map or search map sheets by name. For selecting map sheets from the map first activate the map sheets selection tool and then draw a rectangle to a suitable area or click map sheets one by one. Already selected map sheets may be removed from selection by selecting them again.',
    },
    downloadtab: {
      fi: 'Ladattavat tiedostot',
      en: 'Files for download',
    },
    featureinfotab: {
      fi: 'Kohdetiedot',
      en: 'Feature info',
    },
    metadatatab: {
      fi: 'Metatiedot',
      en: 'Metadata',
    },
    linkstab: {
      fi: 'Linkit',
      en: 'Links',
    },
    metadatainfo: {
      fi:
        "Tämän aineiston <b>kaikki metatiedot</b> löytyvät <a href='!metadata_url!' target='_blank'>" +
        'Etsin-hakupalvelusta</a>.',
      en:
        "<b>All metadata</b> for this dataset is available from <a href='!metadata_url!' target='_blank'>Etsin metadata service</a>.",
    },
    metadatacontentheader: {
      fi: '<h6 class="tab-content-header">Aineiston kuvaus</h6>',
      en: '<h6 class="tab-content-header">Description of dataset</h6>',
    },
    metadatalinksheader: {
      fi: '<h6 class="tab-content-header">Aineistoa kuvaavat tiedostot</h6>',
      en: '<h6 class="tab-content-header">Files describing the dataset</h6>',
    },
    nometadataavailable: {
      fi: 'Aineiston kuvaus ei ole saatavilla',
      en: 'Dataset description not available',
    },
    featureinfodefault: {
      fi: 'Valitse Info-työkalu ja klikkaa karttaa',
      en: 'Select Info tool and click on map',
    },
    maxfeaturewarning: {
      fi:
        'Latauksen kokorajoitus on 3 GB. Korkeintaan !maxFeatures! karttalehteä voidaan valita.',
      en:
        'Download limit is 3 GB. Maximum of !maxFeatures! map sheets may be selected.',
    },
    linksHeader: {
      fi: 'Rsync/FTP/HTTP linkit aineistoon:',
      en: 'Rsync/FTP/HTTP links to dataset:',
    },
    linksInfo: {
      fi:
        "Lisätietoja <a target='_blank' href=!infolink!>FTP ja rsync sivulta</a>.",
      en:
        "Additional info: <a target='_blank' href=!infolink!>FTP and rsync page</a>.",
    },
    linksIntro: {
      fi:
        'Ladataksesi kokonaisia aineistoja tai selataksesi aineiston tiedostoja käytä alla olevia linkkejä:',
      en:
        'For downloading the full dataset or viewing the files included please use these links:',
    },
  },
  map: {
    basemap: {
      fi: 'Taustakartta',
      en: 'Background map',
    },
    indexmap: {
      fi: 'Indeksikartta',
      en: 'Index map',
    },
    datamap: {
      fi: 'Aineisto',
      en: 'Data',
    },
    catchment: {
      fi: 'Valuma-alueet',
      en: 'Catchment areas',
    },
    municipalitiesmap: {
      fi: 'Kuntajako',
      en: 'Municipalities',
    },
    reset: {
      fi: 'Näytä koko Suomi',
      en: 'Zoom to Finland',
    },
    pan: {
      fi: 'Siirrä karttaa hiirellä raahaamalla',
      en: 'Pan, move the map with dragging the mouse',
    },
    select: {
      fi:
        'Valitse karttalehtiä kartalta, raahaamalla nelikulmio tai klikkaamalla',
      en: 'Select map sheets from the map by drawing a rectangle or clicking',
    },
    info: {
      fi: 'Info, katso kohteiden ominaisuustietoja klikkaamalla',
      en: 'Info, see attribute data by clicking',
    },
    clearSelection: {
      fi: 'Poista kaikki karttalehdet valinnasta',
      en: 'Deselect all map sheets',
    },
    draw: {
      fi: 'Valitse karttalehtiä piirtämällä',
      en: 'Select map sheets by drawing',
    },
    dataAvailabilityWarning: {
      fi: 'Aineiston esikatselu ei ole saatavilla',
      en: 'Data preview is not available',
    },
    resolutionwarning: {
      fi: 'Lähennä karttaa nähdäksesi aineiston',
      en: 'Zoom in to see the data',
    },
    locationsearch: {
      fi: 'Etsi sijaintia...',
      en: 'Search for a location...',
    },
    locationNotFound: {
      fi: 'Annetulla haulla ei löytynyt sijantia',
      en: 'The provided query did not find any related location',
    },
  },
  email: {
    modalheader: {
      fi: 'Lähetä latauslinkki sähköpostiini',
      en: 'Send data download link to my e-mail',
    },
    modalheaderList: {
      fi: 'Lähetä tiedostolistaus sähköpostiini',
      en: 'Send file list to my e-mail',
    },
    datasetinfo: {
      fi: 'Valittu aineisto',
      en: 'Selected dataset',
    },
    inputsheader: {
      fi: 'Tiedot lataamista varten',
      en: 'Information for downloading',
    },
    emailfield: {
      fi: 'Sähköpostiosoite',
      en: 'E-mail',
    },
    emailfieldPlaceholder: {
      fi: 'esim@toinen.fi',
      en: 'example@other.com',
    },
    licensefield: {
      fi:
        "Hyväksyn aineiston <a href='!license!' target='_blank'>käyttöehdot</a>",
      en: "I accept the <a href='!license!' target='_blank'>license terms</a>",
    },
    info: {
      fi:
        'Lähetettyäsi tilauksen saat hetken kuluttua sähköpostiisi latauslinkin.',
      en:
        'In a moment after sending the download order, you will receive an e-mail with a download link.',
    },
    infoList: {
      fi:
        'Lähetettyäsi tilauksen saat hetken kuluttua sähköpostiisi tiedostolistan.',
      en:
        'In a moment after sending the order, you will receive an e-mail with a file list.',
    },
    sendButton: {
      fi: 'Lähetä latauslinkki sähköpostiini',
      en: 'Send data download link to my e-mail',
    },
    sendButtonList: {
      fi: 'Lähetä tiedostolista sähköpostiini',
      en: 'Send file list link to my e-mail',
    },
    cancelButton: {
      fi: 'Peruuta',
      en: 'Cancel',
    },
    errorEmailLength: {
      fi: 'Sähköpostiosoite puuttuu',
      en: 'E-mail is missing',
    },
    errorEmailFormat: {
      fi: 'Virheellinen sähköpostiosoite',
      en: 'E-mail address invalid',
    },
    errorCheckboxChecked: {
      fi: 'Käyttöehtojen hyväksyminen on pakollista',
      en: 'Accepting the license terms is mandatory',
    },
  },
  metadataTable: {
    producer: {
      fi: 'Tuottaja',
      en: 'Producer',
    },
    name: {
      fi: 'Aineisto',
      en: 'Dataset',
    },
    scale: {
      fi: 'Mittakaava',
      en: 'Scale',
    },
    year: {
      fi: 'Vuosi',
      en: 'Year',
    },
    format: {
      fi: 'Formaatti',
      en: 'Format',
    },
    coordSys: {
      fi: 'CRS',
      en: 'CRS',
    },
    description: {
      fi: 'Kuvaus',
      en: 'Description',
    },
    license: {
      fi: 'Lisenssi',
      en: 'License',
    },
    download: {
      fi: 'Lataus',
      en: 'Download',
    },
    access: {
      fi: 'Avoin',
      en: 'Open',
    },
    filter: {
      fi: 'Rajaa tuloksia',
      en: 'Filter results',
    },
  },
  header: {
    metadataPage: {
      fi: 'Metatiedot',
      en: 'Metadata',
    },
    downloadPage: {
      fi: 'Latauspalvelu',
      en: 'Download data',
    },
    helpPage: {
      fi: 'Ohjeet',
      en: 'Help',
    },
    webservicesPage: {
      fi: 'Rajapinnat',
      en: 'Web services',
    },
    ftpPage: {
      fi: 'FTP ja rsync',
      en: 'FTP and rsync',
    },
    openDataPage: {
      fi: 'Avaa aineistosi',
      en: 'Open your data',
    },
    contactPage: {
      fi: 'Yhteystiedot',
      en: 'Contact',
    },
    contact: {
      fi: 'Ota yhteyttä',
      en: 'Contact',
    },
    language: {
      fi: 'In English',
      en: 'Suomeksi',
    },
    login: {
      fi: 'Kirjaudu',
      en: 'Log in',
    },
    searchPlaceholder: {
      fi: 'Etsi AVAA-Portaalista',
      en: 'Search from AVAA Portal',
    },
    searchButton: {
      fi: 'Etsi',
      en: 'Search',
    },
  },
  webservicesTable: {
    dataUrl: {
      fi: 'Karttatason nimi',
      en: 'Layer name',
    },
    layerName: {
      fi: 'Karttatason otsikko',
      en: 'Layer title',
    },
    scaleLimit: {
      fi: 'Mittakaavarajoitus',
      en: 'Scale limit',
    },
  },
  contact: {
    content: {
      fi: `<div class="content-article">
  <h1>Yhteystiedot</h1>
  <h3>Paitulin ylläpito ja kehitys</h3>
  <ul>
      <li>
          <a href="http://www.csc.fi/paituli">CSC - Tieteen tietotekniikan keskus</a><br />
          CSC:n paikkatietokoordinaattori, +358 50 38 12 838, giscoord@csc.fi
      </li>
  </ul>
  <h3>Paikkatietoaineistojen tuottajat</h3>
  <ul>
      <li>
          <a href="https://blogs.helsinki.fi/saavutettavuus/">Helsingin yliopisto, Digital Geography Lab</a>
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.ilmatieteenlaitos.fi">Ilmatieteen laitos (FMI)</a><br />
          Pentti Pirinen, pentti.pirinen@fmi.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.kotus.fi">Kotimaisten kielten keskus (KOTUS)</a><br />
          sms@kotus.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.digiroad.fi">Väylävirasto, Digiroad</a><br />
          Digiroad-käyttäjien sähköpostituki, info@digiroad.fi
      </li>
  </ul>
  <ul>
      <li><a href="http://www.latuviitta.org/">Latuviitta</a></li>
  </ul>
  <ul>
      <li>
          <a href="http://www.maanmittauslaitos.fi">Maanmittauslaitos (MML)</a><br />
          Asiakaspalvelu, asiakaspalvelu@maanmittauslaitos.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.mavi.fi">Maaseutuvirasto</a><br />
          tiedonluovutus@mavi.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.syke.fi">Suomen ympäristökeskus (SYKE)</a><br />
          GIS-tuki, gistuki.syke@ymparisto.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="http://www.tilastokeskus.fi">Tilastokeskus</a><br />
          inspire@tilastokeskus.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="https://vrk.fi/">Väestörekisterikeskus</a><br />
          esko.kirjalainen@vrk.fi
      </li>
  </ul>
</div>`,
      en: `<div class="content-article">
  <h1>Contact</h1>
  <h3>Paituli service maintenance and development</h3>
  <ul>
      <li>
          <a href="http://www.csc.fi/paituli">CSC - IT center for science</a><br />
          CSC GIS coordinator, +358 50 38 12 838, giscoord@csc.fi
      </li>
  </ul>
  <h3></h3>
  <h3>Providers of Paituli datasets</h3>
  <ul>
      <li>
          <a href="http://www.ilmatieteenlaitos.fi">Finnish Meteorological Institute (FMI)</a><br />
          Pentti Pirinen, pentti.pirinen@fmi.fi<br />
      </li><br>
      <li>
          <a href="http://www.kotus.fi">Institute for the Languages of Finland (KOTUS)</a><br />
          sms@kotus.fi<br />
      </li><br>
      <li>
          <a href="http://www.digiroad.fi">Finnish Transport Infrastructure Agency, Digiroad</a><br />
          Digiroad user support, info@digiroad.fi<br />
      </li><br>
      <li><a href="http://www.latuviitta.org/">Latuviitta</a><br /></li>
      <li>
          <a href="http://www.maanmittauslaitos.fi">National Land Survey (MML)</a><br />
          Customer service, asiakaspalvelu@maanmittauslaitos.fi<br />
      </li><br>
      <li>
          <a href="http://www.mavi.fi">Agency for Rural Affairs</a><br />
          tiedonluovutus@mavi.fi<br />
      </li><br>
      <li>
          <a href="http://www.syke.fi">Finnish Environment Institute (SYKE)</a><br />
          GIS-tuki, 020 490 2659, gistuki.syke@ymparisto.fi<br />
      </li><br>
      <li>
          <a href="http://www.tilastokeskus.fi/index_en.html">Statistics Finland</a><br />
          inspire@tilastokeskus.fi
      </li><br>
  </ul>
  <ul>
      <li>
          <a href="https://vrk.fi/">Population register center</a><br />
          esko.kirjalainen@vrk.fi
      </li>
  </ul>
  <ul>
      <li>
          <a href="https://blogs.helsinki.fi/saavutettavuus/">University of Helsinki, Digital Geography Lab</a>
      </li>
  </ul>
</div>`,
    },
  },
  help: {
    content: {
      fi: `<div class="content-article">
      <h1>Ohjeet</h1>
      <ul>
          <li><a href="https://research.csc.fi/gis-guidelines">Ohjeita paikkatietoaineistojen käyttämiseksi</a>, mm.
              tiedostojen formaatin ja koordinaattijärjestelmän vaihtaminen.</li>
          <li><a href="https://research.csc.fi/open-gis-data">Muita avoimia paikkatietoaineistoja</a>, Suomesta ja
              maailmalta, latauspalveluja ja rajapintoja.</li>
      </ul>
      <h2>PaITuli-latauspalvelun käyttö</h2>
  
      <p><b>Karttatyökalut</b>:<br>
          <br>
          <img align="middle"
              src="/documents/36101/38621/S_suomi.png/b7d3fc00-5685-4082-b26b-28ee9fba6fe1?t=1444225672659"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Koko Suomi</i> -työkalun avulla voit tuoda karttaikkunan
          alkutilaan<br>
          <img align="middle" src="/documents/36101/38621/S_pan.png/162fa31b-8ad9-42a0-9764-a085dab50953?t=1444225657959"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Siirrä karttaa</i> -työkalun avulla voit liikuttaa
          karttaa<br>
          <img align="middle" src="/documents/36101/38621/S_zoom.png/c6af3aca-4c1e-46f6-a71e-7bddc68541bc?t=1444225759937"
              style="width: 25px; height: 45px;"> <i>Lähennä ja loitonna</i> -työkalun avulla voit zoomata karttaa sisään
          ja ulos<br>
          <img align="middle"
              src="/documents/36101/38621/S_select.png/52e7c21d-fac1-48d2-8aa6-d4b6306d7773?t=1444225666171"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Valitse ladattava alue</i> -työkalun avulla voit valita
          karttalehtiä tai alueita<br>
          <img align="middle"
              src="/documents/36101/38621/S_deselect.png/676a96d3-a8d1-43a7-ab06-6ea3cfc8d589?t=1444225642691"
              style="width: 30px; height: 30px;"> <em>Poista kaikki karttalehdet</em> valinnasta<br>
          <img alt="" src="/documents/36101/38621/S_info.png/a5e58194-3d5e-45a2-ba55-c4eece55a015?t=1444225648735"
              style="width: 30px; height: 30px; margin: 2px;"><em>Info</em>-työkalun avulla voi tarkista aineiston
          ominaisuustietoja, jotka tulevat näkyviin kartasta vasemmalle <em>Kohdetiedot-</em>ikkunaan klikkaamalla
          karttaa.<br>
          <img alt=""
              src="/documents/36101/38621/S_layerswitcher.png/f3f4e975-1025-41ae-b071-bd039701cd68?t=1444225653210"
              style="width: 30px; height: 30px; margin: 2px;"><em>Karttatasojen hallinta</em>. Valitse kartalla
          näytettävät karttatasot. Oletuksena näytetään taustakartta, karttalehtijako (indeksikartta) ja valittu aineisto.
          Kartalle voi lisätä kuntarajat tai valuma-alueet.</p>
  
      <ul>
          <li>Karttaikkunan vasemmalla alareunassa on <em>indeksikartta</em>, josta näet pienemmässä mittakaavassa alueen,
              johon olet kohdistanut kartan</li>
          <li><em>Paikannimihaku</em> löytyy kartan yläpuolelta. Paikannimihaku käyttää OpenStreetMap aineistoa ja sen
              kautta löytyy paikannimet koko maailmasta sekä myös OSM:n aineistosta löytyvät katuosoitteet.</li>
      </ul>
  
      <h3>Paikkatietoaineistojen lataaminen latauspalvelusta</h3>
  
      <ol>
          <li><b>Valitse</b> <strong>haluamasi paikkatietoaineisto</strong> sivun vasemmassa yläkulmassa olevasta
              valikosta tai <a href="/web/paituli/metadata">Metatiedot </a>sivulta. Valitse paikkatietoaineiston tuottaja,
              aineisto, mittakaava, vuosi, formaatti sekä koordinaattijärjestelmä.
  
              <ul>
                  <li>Huomaa, kun valikko on valkoinen, tarjolla on useampi kuin yksi vaihtoehto, kun taas valikko on
                      harmaa aineisto on saatavilla ainoastaan kyseisessä muodossa.</li>
                  <li>Aineistovalikon alapuolelle ilmestyy ladattavan tiedoston nimi sekä käyttöehdot tai jos aineisto on
                      jaettu karttalehdiksi, ohje karttalehtien valitsemiseksi. Karttaikkunaan ilmestyy valitsemastasi
                      aineiston kattama alue ja karttalehtijako.</li>
              </ul>
          </li>
          <li>Tarvittaessa<b> valitse ladattavat karttalehdet </b>joko valitsemalla alue kartalta <img
                  src="/documents/36101/38621/S_select.png/52e7c21d-fac1-48d2-8aa6-d4b6306d7773?t=1444225666171"
                  style="width: 20px; height: 20px;"> tai karttalehtien haun avulla<b>.</b>&nbsp;
              <ul>
                  <li>Valinnan voi tehdä kartalla joko klikkaamalla karttalehtiä yksittäin tai raahaamalla neliön.</li>
                  <li>Valitsemasi karttalehdet tai alueet ilmestyvät aineistovalikon alapuolelle.</li>
                  <li>Uusi valinta kartalta lisätään edellisten joukkoon.</li>
                  <li>Jo valitun karttalehden uudestaan valinta kartalta poistaa sen valittujen joukosta.</li>
                  <li>Valittuja karttalehtiä voi poistaa latauksesta myös klikkaamalla niitä ladattavien tiedostojen
                      listalta.</li>
                  <li>Kaikkien karttalehtien poistamiseksi valinnasta käytä vastaava työkalua: <img alt=""
                          src="/documents/36101/38621/S_deselect.png/676a96d3-a8d1-43a7-ab06-6ea3cfc8d589?t=1444225642000"
                          style="width: 20px; height: 20px;"></li>
                  <li><em>Karttalehtien haku</em> toimii kyseisen paikkatietoaineiston tiedostonimillä ja tyhjentää aina
                      edelliset valinnat.</li>
              </ul>
          </li>
          <li><b>Aloita</b> <strong>aineistojen lataus</strong> painamalla <i>Lataa</i>-painiketta. Näytölle ilmestyy
              <i>Lataustilauksen lähetys</i>-ikkuna.</li>
          <li>Lue paikkatietoaineistoa koskevat <strong>käyttöehdot </strong>linkistä ja hyväksy ne.</li>
          <li><b>Kirjoita sähköposti-osoitteesi</b></li>
          <li><strong>Lähetä tilaus</strong> painamalla <em>Lähetä tilaus</em>-painiketta.
              <ul>
                  <li>Tämän jälkeen valitut tiedostot pakataan yhteen zip-tiedostoon ja latauslinkki lähetään antamasi
                      sähköposti-osoitteeseen. Lataustiedoston generointiaikaa riippuu ladattavan aineiston määrästä ja
                      palvelun kuormituksesta, mutta yleensä pitäisi olla muutamia minuutteja.</li>
              </ul>
          </li>
      </ol>
  
      <h3>Paikkatietoaineistojen esikatselu latauspalvelusta</h3>
  
      <p>Osalle aineistoista on saatavilla myös esikatselu. Ne tulevat oletuksena näkyviin heti, kun aineisto on
          valittuna.</p>
  
      <ul>
          <li>Osa aineistoista tulee näkyviin vain tarkemmissa mittakaavoissa, silloin kartan vasemmassa yläkulmassa on
              siitä ilmoitus.</li>
          <li>Aineiston esikatselun voi poistaa näkyvistä karttalehtien hallinta valikosta.</li>
          <li>Aineiston ominaisuustietoja voi kysellä valitsemalla Info työkalun <img alt=""
                  src="/documents/36101/38621/S_info.png/a5e58194-3d5e-45a2-ba55-c4eece55a015?t=1444225648735"
                  style="width: 20px; height: 20px;"> ja klikkaamalla kartalla.</li>
      </ul>
  </div>`,
      en: `<div class="content-article">
      <h1>Help</h1>
  
      <ul>
          <li><a href="https://research.csc.fi/gis-guidelines">Guidelines for using spatial data, </a>inc. changing format
              and coordinate system.</li>
          <li><a href="https://research.csc.fi/open-gis-data">List of open spatial datasets</a>, From Finland and
              globally, as files and as web services.</li>
      </ul>
      <h2>Paituli download service help</h2>
  
      <p><b>Map tools</b>:<br>
          <br>
          <img align="middle"
              src="/documents/36101/38621/S_suomi.png/b7d3fc00-5685-4082-b26b-28ee9fba6fe1?t=1444225672659"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Whole Finland</i> tool allows you to reset the map
          window<br>
          <img align="middle" src="/documents/36101/38621/S_pan.png/162fa31b-8ad9-42a0-9764-a085dab50953?t=1444225657959"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Pan</i> tool allows you to move the map<br>
          <img align="middle" src="/documents/36101/38621/S_zoom.png/c6af3aca-4c1e-46f6-a71e-7bddc68541bc?t=1444225759937"
              style="width: 25px; height: 45px;"> <i>Zoom in and out</i> tool allows you to zoom the map in or out<br>
          <img align="middle"
              src="/documents/36101/38621/S_select.png/52e7c21d-fac1-48d2-8aa6-d4b6306d7773?t=1444225666171"
              style="width: 30px; height: 30px; margin: 2px;"> <i>Select the download area</i> tool allows you to choose
          map sheets or areas<br>
          <img align="middle"
              src="/documents/36101/38621/S_deselect.png/676a96d3-a8d1-43a7-ab06-6ea3cfc8d589?t=1444225642691"
              style="width: 30px; height: 30px;"> <em>Deselect all map sheets</em><br>
          <img alt="" src="/documents/36101/38621/S_info.png/a5e58194-3d5e-45a2-ba55-c4eece55a015?t=1444225648735"
              style="width: 30px; height: 30px; margin: 2px;"><em>Info</em> tool, check the attribute values, which are
          displayed on the left in Feature info tab after clicking on map<br>
          <img alt=""
              src="/documents/36101/38621/S_layerswitcher.png/f3f4e975-1025-41ae-b071-bd039701cd68?t=1444225653210"
              style="width: 30px; height: 30px; margin: 2px;"><em>Layer control</em>. Choose which layers are displayed on
          map, by default are displayed background map, map sheets and if available the selected dataset. Optionally you
          can add Finnish municipality borders and drainage areas.</p>
  
      <ul>
          <li>Index map in the bottom&nbsp;left corner of the map window shows the area in which you have zoomed in</li>
          <li><em>Place name search</em> is above the map. It uses OpenStreetMap data and finds globally place names and
              also addresses available in OSM.</li>
      </ul>
  
      <h3>Downloading data from Paituli</h3>
  
      <ol>
          <li><b>Select the dataset</b> from the drop-down menus in the upper left corner of Download data page or from <a
                  href="/web/paituli/metadata">Metadata</a> page. Select data producer, dataset, scale, year, format and
              coordinate system.
  
              <ul>
                  <li>Note that if a drop-down menu is white, it has several options, if it is gray, it has only one
                      option available for the selected dataset.</li>
                  <li>In the Files for download tab are displayed the name of data file and license term OR if the dataset
                      is divided to map sheets, tip for selecting the map sheets. On the map is displayed the area of
                      selected dataset and map sheets.</li>
              </ul>
          </li>
          <li>If need <b>select map sheets </b>from the map with the <i>Select map sheets</i> tool <img
                  src="/documents/36101/38621/S_select.png/52e7c21d-fac1-48d2-8aa6-d4b6306d7773?t=1444225666171"
                  style="width: 20px; height: 20px;"> or using the map sheet search<b>.</b>&nbsp;
              <ul>
                  <li>From the map you can choose the map sheets with either drawing a rectangle or clicking.</li>
                  <li>The selected map sheets are listed in the Files for download tab on the left.</li>
                  <li>If new map sheets are selected from the map they are added to the existing selection.</li>
                  <li>If selecting an already selected map sheet it will be removed from the selection.</li>
                  <li>It is possible to deselect map sheets also with clicking them in the Files for download tab.</li>
                  <li>For deselecting all map sheets use the Deselect all map sheets tool: <img alt=""
                          src="/documents/36101/38621/S_deselect.png/676a96d3-a8d1-43a7-ab06-6ea3cfc8d589?t=1444225642000"
                          style="width: 20px; height: 20px;"></li>
                  <li><em>Map sheets search</em> uses the file names of selected dataset and removes earlier selected
                      files from selection.</li>
              </ul>
          </li>
          <li><b>Start</b> the data download by pressing <i>Download dataset</i> button.<em> Download order </em>window is
              displayed.</li>
          <li><b>Read</b> the terms of data use and accept them</li>
          <li><b>Write you e-mail</b></li>
          <li>Click <strong><em>Send download order</em></strong>-button.
              <ul>
                  <li>Then the selected files will be zipped to one file and the download link will be sent to the given
                      e-mail. The generation time of the download link depends on size of selected data and load of
                      service, but should normally be a couple of minutes.</li>
              </ul>
          </li>
      </ol>
  
      <h3>Previewing data</h3>
  
      <p>Several of the datasets can also be previewed on the Download data page. The data preview is available by
          default, after the dataset has been selected.</p>
  
      <ul>
          <li>Some of the datasets are displayed only in bigger scales, then there is a notice about zooming in in the
              upper left corner of the map.</li>
          <li>You can remove the data preview layer from the map from the layer control.</li>
          <li>The attribute data can be shown by choosing Info tool <img alt=""
                  src="/documents/36101/38621/S_info.png/a5e58194-3d5e-45a2-ba55-c4eece55a015?t=1444225648735"
                  style="width: 20px; height: 20px;"> and clicking on the map. The attribute values are shown on the left
              in Feature info tab.</li>
      </ul>
  </div>`,
    },
  },
  ftprsync: {
    content: {
      fi: `<div class="content-article">
      <h1>Http:n, ftp:n ja rsyncin yli lataaminen</h1>
  
      <p>Paitulista ladattavan zip paketin enimmäiskoko on 2Gb, joten isompien aineistojen osalta on ollut mahdollista
          ladata vain muutamia karttalehtiä kerrallaan. Tämän rajoituksen poistamiseksi Paituliin on nyt lisätty
          mahdollisuus ladata avoimmella lisenssillä (useimmiten CC-BY-4.0 lisenssi) jaettavia aineistoja myös HTTP:n,
          FTP:n tai rsyncin avulla nic.funet.fi palvelusta. Aineistojen käyttöehdot löytyvät <a
              href="/web/paituli/metadata">Metadata </a>sivulta.</p>
  
      <p>Protokollien juurihakemistot ovat:</p>
  
      <ul>
          <li>HTTP:<a href="http://www.nic.funet.fi/index/geodata/">http://www.nic.funet.fi/index/geodata/</a></li>
          <li>FTP: <a href="ftp://ftp.funet.fi/pub/sci/geo/geodata/">ftp://ftp.funet.fi/pub/sci/geo/geodata/</a></li>
          <li>rsync: rsync://rsync.nic.funet.fi/ftp/pub/sci/geo/geodata/</li>
      </ul>
  
  
  
      <h3>Suositeltavat ohjelmistot</h3>
  
      <p>FTP ja rsync ovat molemmat hyviä vaihtoehtoja alihakemistoja sisältävien hakemistojen lataamiseen. Molempia
          käytettäessä voi helposti valita vain ylimmän kansion ja ladata kaikki alikansiot sisältöineen automaattisesti.
      </p>
  
      <ul>
          <li>Helpoin tapa käyttää FTP:tä Windowsissa on ladata tähän tarkoitukseen tehty ohjelmisto, esimerkiksi <a
                  href="https://filezilla-project.org/">Filezilla</a> tai <a
                  href="https://winscp.net/eng/download.php">WinSCP</a></li>
          <li>Komentorivityökaluista suosittelemme <strong>rsync </strong>ohjelmaa. Se tarjoaa mahdollisuuden jatkaa
              keskeytynyttä latausta, joten se on parempi vaihtoehto todella isojen (n. 100 Gb +) aineistojen lataamiseen.
              rsyncin pitäisi tulla useimpien Linux jakeluiden mukana valmiiksi asennettuna. Windows ympäristössä se tulee
              asentaa itse esimerkiksi <a href="http://itefix.net/cwrsync">täältä</a>.</li>
          <li>Jos rsync ei ole käytettävissä, seuraava vaihtoehto on <strong>wget</strong>.</li>
      </ul>
  
  
  
      <h3>Aineiston löytäminen</h3>
  
      <p>Paituli sisältää noin 7Tb (=7000Gb) dataa, joten useimmiten on tarpeen ladata vain pieni osa Paitulin sisällöstä.
      </p>
  
  
  
      <p><strong>Kokonaisen aineiston lataaminen:</strong></p>
  
      <p>Paitulin hakemistoja on helppo selata HTTP tai FTP osoitteiden kautta. Aineistot on tallennettu loogisiin
          alihakemistoihin, joten halutun aineiston löytäminen pitäisi olla kohtuullisen helppoa. Hakemistopuussa tulee
          ensin valita aineiston tuottaja, sitten itse aineisto, ja lopuksi vuosiversio (sekä mahdollisesti muita
          vaihtoehtoja).</p>
  
      <p>Toinen vaihtoehto on katsoa aineistojen polut Latauspalvelusta:</p>
  
      <ol>
          <li>Avaa<span> <a href="/web/paituli/latauspalvelu">Latauspalvelu</a></span>,</li>
          <li>Valitse haluamasi aineisto</li>
          <li>Valitse "Linkit" välilehti vasemmasta alakulmassa.</li>
          <li>Käytä jotain FTP työkalua TAI rsynciä aineiston lataamiseksi:</li>
      </ol>
  
      <div class="codeBlock">rsync -a rsync://rsync.nic.funet.fi/ftp/pub/sci/geo/geodata/<b style="color:blue;">mml/hallintorajat_milj_tk/2017/ folder_to_save/</b></div>
  
      <ul>
          <li>Vaihda komennossa siniset osat vastaamaan valitsemaasi aineistoa ja tallennushakemistoasi.</li>
          <li>-a käytä arkisto tilaa, mm. säilyttää alkuperäiset aikaleimat ja lataa kaikki alihakemistot</li>
      </ul>
  
  
  
      <p><strong>Vain tiettyjen karttalehtien lataaminen:</strong></p>
  
      <ol>
          <li>Avaa<span> <a href="/web/paituli/latauspalvelu">Latauspalvelu</a></span>,</li>
          <li>Valitse haluamasi aineisto</li>
          <li>Valitse karttalehdet kartalta tai haulla</li>
          <li>Klikkaa "Lataa tiedostolista" painiketta.</li>
          <li>Saat tiedostolistauksen sähköpostiisi, lataa listaus omalle koneelle.<br>
              (Vaihtoehtoisesti voi tiedostolistauksen muodostaa hyödyntämällä indeksikartan path sarakkeen tietoja.
              Indeksikartta on saatavilla Linkit välilehdeltä <a href="/web/paituli/latauspalvelu">Latasupalvelu
              </a>sivulla.)</li>
          <li>Käytä rsynciä aineiston lataamiseksi:</li>
      </ol>
  
      <div class="codeBlock">rsync -a --files-from=<b style="color:blue;">file_list.txt</b> rsync://rsync.nic.funet.fi/ftp/pub/sci/geo <b style="color:blue;">folder_to_save/ </b></div>
  
  
  
      <p><strong>wget käyttö aineiston lataamiseksi</strong></p>
  
      <p>Joskus organisaation palomuuri voi estää ftp ja rsync:n käytön. Silloin on parasta käyttää wget työkalua http:n
          kanssa. wget:lla on paljon asetuksia, yksi toimiva tapa on seuraava:</p>
  
      <div class="codeBlock">wget -r -l inf -N -np -nH -x -E -R html --cut-dirs= http://www.nic.funet.fi/index/geodata/<b style="color:blue;">mml/hallintorajat_milj_tk/2017/</b></div>
  
      <div>-r, lataa rekursiivisesti alihakemistot.</div>
  
      <div>-l inf, miten syvälle rekursiivinen lataus lähtee, oletuksena 5, tässä laitettu loputtomaksi</div>
  
      <div>-N, vain päivitys, jo olemassa olevia tiedostoja ei ladata uudestaan, tämä on tärkeä, jos lataus keskeytyy tai
          jos päivitetään jo aikaisemmin ladattua aineistoa.</div>
  
      <div>-np, estää ylähakemistojen latautumisen</div>
  
      <div>-nH, poistaa palvelimen nimen</div>
  
      <div>-x, kopioi hakemistorakenne</div>
  
      <div>-cuts-dirs, leikkaa hakemistoja polun alusta, että hakemistopuu ei olisi liian pitkä, säätä tätä arvoa tarpeen
          mukaan</div>
  
      <div>-E, lisää html tiedostoille .html tiedonimen loppuun, muuten luodaan tiedostoja, jolla ei ole tiedostopäätettä
          (ei tarvetta, jos käytetään ftp:tä)</div>
  
      <div>-R html, älä tallenna html tiedostoja (ei tarvetta, jos käytetään ftp:tä)</div>
  
  
  
      <ul>
          <li>Jos mahdollista, käytä ftp palvelua, käyttämällä HTTP protokolla, saat ylimääräisiä index.* tiedostoja.</li>
          <li>Jos haluat ladata tiedostolistauksen avulla, lisää -i optio komentoon. Lisää myös juurihakemisto
              tiedostolistaukseen jokaiselle riville. Juurihakemistot on annettu tämän sivun alussa.</li>
      </ul>
  
  
  
      <h3>FTP mountin tekeminen</h3>
  
      <p>Voit myös mountata paitulin FTP hakemiston omalle koneellesi. Tämä mahdollistaa tiedostojen selaamisen ja
          avaamisen suoraan GIS ohjelmilla (esim. qgis) ilman erillistä latausvaihetta. Tiedostot täytyy kuitenkin
          tietysti ladata, vaikka tämä tapahtuukin automaattisesti niitä avatessa, joten avaaminen FTP:n ylitse on
          hitaampaa kuin paikallisen tiedoston avaaminen.</p>
  
      <ul>
          <li>Linuxin käyttäjät voivat käyttää esim.<span> </span><a href="http://curlftpfs.sourceforge.net/"
                  style="margin: 0px; padding: 0px; color: rgb(54, 182, 69) !important; text-decoration: none;">curlFtpFS</a>.
          </li>
          <li>Windows käyttäjille ilmeisesti ei ole saatavilla vastaavaa ilmaista ohjelmistoa, joka toimisi järkevällä
              nopeudella.</li>
      </ul>
  </div>`,
      en: `<div class="content-article">

      <h3>Bulk download over http, ftp and rsync</h3>
  
      <p>If you would like to download bigger amounts of Paituli data, using the traditional download as .zip
          file might be quite limiting. To overcome that we have now added the option of downloading data over HTTP, FTP
          and rsync from nic.funet.fi service. In this way only data with open license (in most cases CC-BY-4.0 license)
          is available, each datasets accessibility can be seen from <a href="/web/paituli/metadata">Metadata </a>page.
      </p>
  
      <p>The root paths for each protocal are:</p>
  
      <ul>
          <li>HTTP: <span class="Object" id="OBJ_PREFIX_DWT3345_com_zimbra_url" role="link"><span class="Object"
                      id="OBJ_PREFIX_DWT3357_com_zimbra_url" role="link"><a class="moz-txt-link-freetext"
                          href="http://www.nic.funet.fi/index/geodata/"
                          target="_blank">http://www.nic.funet.fi/index/geodata/</a></span></span></li>
          <li><span class="Object" role="link"><span class="Object" role="link">FTP: </span></span><span
                  class="Object" id="OBJ_PREFIX_DWT3346_com_zimbra_url" role="link"><span class="Object"><a class="moz-txt-link-freetext"
                          href="ftp://ftp.funet.fi/pub/sci/geo/geodata/">ftp://ftp.funet.fi/pub/sci/geo/geodata/</a></span></span></li>
          <li ><span class="Object" role="link"><span class="Object" role="link">rsync:
                  </span></span>rsync://rsync.nic.funet.fi/ftp/pub/sci/geo/geodata/</li>
      </ul>
  
      <h3>Recommended software</h3>
  
      <p>FTP and rsync are both good options for downloading folders with subfolders, as it is easy to just select the
          highest level folder and download all of its contents.</p>
  
      <ul>
          <li>The easiest way for using an FTP service is to download an suitable graphical tool, for example <a
                  href="https://filezilla-project.org/">Filezilla </a>or <a
                  href="https://winscp.net/eng/download.php">WinSCP</a>.</li>
          <li>Of command line tools we recommend <strong>rsync</strong>. It has the ability to continue a download, if it
              has frozen for some reason and can preserve the original modification date. rsync should be included in most
              Linux distributions by default. In Windows you have to add it, for example from <a
                  href="https://itefix.net/cwrsync">here</a>.</li>
          <li>If rsync is not suitable, try <strong>wget</strong>.</li>
      </ul>
      <h3>Finding the data</h3>
  
      <p>Paituli includes in total 7 Tb (= 7000 Gb) of data, so in most cases it should be enough to download only some
          parts of it.</p>
  
      <p><strong>If you want to download the whole dataset</strong></p>
  
      <p>You can browse the the directories in HTTP or FTP mode, the datasets have been stored in quite logical structure,
          so you might find what you are looking for. In the tree you have to first select the data producer, then dataset
          and then year (and other options). The folders have mostly names in Finnish.</p>
  
      <p>The other option is to find the dataset spesific paths from Download page:</p>
  
      <ol>
          <li>Open the <a href="/web/paituli/latauspalvelu">Download </a>page,</li>
          <li>Select the dataset you are interested</li>
          <li>Open the "Links" tab in lower left corner.</li>
          <li>Navigate to the mentioned folder with some FTP tool OR use rsync for downloading the data:</li>
      </ol>
  
      <div class="codeBlock">rsync -a rsync://rsync.nic.funet.fi/ftp/pub/sci/geo/geodata/<b style="color:blue;">mml/hallintorajat_milj_tk/2017 /folder_to_save/</b></div>
  
      <ul>
          <li>Change the blue parts in the command as needed.</li>
          <li>-a use archive mode, inc. save the original dates and download reqursively also all subfolders</li>
      </ul>
  
      <p><strong>If you want to download only spesific mapsheets of some dataset</strong></p>
  
      <ol>
          <li>Open the <a href="/web/paituli/latauspalvelu">Download </a>page.</li>
          <li>Select the dataset you are interested</li>
          <li>Select the mapsheets you need from the map or find them with the search.</li>
          <li>Click on the "Download list of files" button on the left side.</li>
          <li>You will receive the link to file list to your e-mail, download that file.<br>
              (Alternatively you can make a custom file using the paths given in index map, which is available for each
              dataset in <a href="/web/paituli/latauspalvelu">Download </a>page Links tab.)</li>
          <li>Use rsync for downloading the data:</li>
      </ol>
  
      <div class="codeBlock">rsync -a --files-from=<b style="color:blue;">file_list.txt</b> rsync://rsync.nic.funet.fi/ftp/pub/sci/geo <b style="color:blue;">folder_to_save/</b> </div>
  
      <h3>Using wget for download</h3>
  
      <p>In some places ftp and rsync are forbidden at firewall level, then you can use wget with http. wget has a lot of
          different options, one well working combination is this:</p>
  
      <div class="codeBlock">wget -r -l inf -N -np -nH -x -E -R html --cut-dirs= http://www.nic.funet.fi/index/geodata/<b style="color:blue;">mml/hallintorajat_milj_tk/2017/</b> </div>
  
      <div>-r, recursive download</div>
  
      <div>-l inf, how deep the requirsive search goes, default is 5, here set to infinite</div>
  
      <div>-N, update only, do not download already existing files, this is important if download was interrupted or
          updating already existing data.</div>
  
      <div>-np, do not download parent directories</div>
  
      <div>-nH, remove hostname</div>
  
      <div>-x, make directories similarly to Paituli</div>
  
      <div>-cuts-dirs, cut certain number of directories from the beginning to avoid too deep directory trees</div>
  
      <div>-E, makes html files to be named like .html, otherwise files without any extention are created (not needed when
          using ftp)</div>
  
      <div>-R html, do not save html files (not needed when using ftp)</div>
  
  
      <div>
          <ul>
              <li>Use the ftp protocol if possible, otherwise you might get some extra index.* files.</li>
              <li>If you want to file list, add the -i option with the name of files list file. Add also the root path to
                  each row. The root paths are given in the beginning of this page.</li>
          </ul>
  
      </div>
  
      <h3>Mounting FTP as local drive</h3>
  
      <p>It is possible to mount an FTP site as local drive. This would enable opening the files directly from any GIS
          software without any extra manual steps for downloading. Of course the files actually have to be downloaded
          before using them, so opening a file from FTP is slower than actual local file.</p>
  
      <ul>
          <li>Linux users can use for example <a href="http://curlftpfs.sourceforge.net/">curlFtpFS</a>.</li>
          <li>For Windows there does not seem to be any such free software that would work with reasonable speed.</li>
      </ul>
  </div>`,
    },
  },
  opendata: {
    content: {
      fi: `<div class="content-article">
      <h1>Avaa paikkatietoaineistosi</h1>
  
      <p>Suomen korkeakoulujen opiskelijoilla ja henkilökunnalla on mahdollisuus julkaista omia aineistoja Paitulissa
          ilmaiseksi. Aineistojen julkaisu ei tarkoita aineistoon liittyvien oikeuksien luovuttamista. Aineisto voi olla
          tuotettu esimerkiksi osana tutkimusta tai opetusprojektia. Aineiston julkaisun jälkeen aineisto on vapaasti
          ladattavissa latauspalvelusta ja mahdollisuuksien mukaan WMS-, WMTS- ja WFS-rajapintojen yli. CSC seuraa
          aineistojen latausmääriä ja raportoi vuosittain aineistojen toimittajille.</p>
  
      <h3>Ohjeet aineiston avaamiseksi</h3>
  
      <ol>
          <li><span style="font-size:16px;"><strong>Varmista että aineisto on avattavissa</strong>. <span
                      style="font-size:16px;">Avataksesi aineiston tulee sinun olla aineiston omistaja tai saada lupa
                      julkaista aineisto sen omistajalta. Varmistathan myös ettei mikään sopimus tai tekijänoikeus estä
                      aineiston avaamista. Aineiston uudelleenkäyttö on sallittava. Suosittelemme <a
                          href="http://creativecommons.org/licenses/by/4.0/legalcode.fi">Creative Commons BY 4.0</a>
                      -lisenssiä. </span></span></li><br>
          <li><strong><span style="font-size:16px;"><span style="font-size:16px;"><span style="font-size:16px;">Kuvaile
                              aineisto</span></span></span></strong><span style="font-size:16px;"><span
                      style="font-size:16px;"><span style="font-size:16px;">. Paitulissa olevien aineistojen metatiedot
                          julkaistaan&nbsp;<span style="font-size:16px;"><a
                                  href="http://etsin.avointiede.fi">Etsin-palvelussa</a>.</span> <span
                              style="font-size:16px;">Aineiston julkaisemiseksi ja hyödyntämiseksi tarvitaan sitä
                              kuvailevia tietoja: mitä data pitää sisällään, miten se on tehty, kuka sen omistaa jne.
                              Paikkatietoaineistojen tarkkuus (mittakaava) ja koordinaattijärjestelmä tulisi kirjoittaa
                              etusivun "Vapaa kuvaus" kenttään, formaatille ja ajankohdalle löytyvät sopivat kentät
                              alisivulta "4. Lisätietoa".</span></span></span></span></li><br>
          <li><strong>Luo aineistopaketti</strong>, teknisiä suosituksia: 
              <ul><br>
                  <li>Formaatti: Pakattu Geotiff tai JPG2000 rasteriaineistoille, Shape tai PostGIS dump
                      vektoriaineistoille, LAZ laserkeilausaineistoille.</li>
                  <li>Koordinaattijärjestelmä: ETRS-TM35FIN (EPSG:3067) Suomen aineistoille, WGS-84 (EPGS:4326)
                      globaaleille aineistoille.</li>
                  <li>Tiedoston koko max 2 Gb.</li>
                  <li>Tarvittaessa voit jakaa aineistosi karttalehdiksi, jos karttalehtijaosta on saatavilla oma tiedosto,
                      sen voi lisätä aineistopakettiin.</li>
                  <li>Pakkaa kaikki tiedostot yhteen .zip-pakettiin.</li>
                  <li>Nämä on vain suosituksia, jos aineistollesi olisi sopivampi joku muu vaihtoehto tarkista kysymys
                      CSC:lta.</li>
              </ul>
          </li><br>
          <li>Vaihtoehtoinen. Jos haluat, että aineistosi esitetään WMS ja WMTS palveluissa valitsemasi
              <strong>tyyli</strong>llä voit lisätä aineistopakettiin tyylitiedoston&nbsp;<a
                  href="http://docs.geoserver.org/latest/en/user/styling/sld-cookbook/">SLD</a> formaatissa. Jos SLD
              tuottaminen on vaikea, myös ArcGIS:lle tai QGIS:lle sopivia tyylitiedostoja voi lähettää.</li><br>
          <li><strong>Lähetä aineistosi ja Etsimen URN</strong> osoitteeseen: <a class="external-link"
                  href="mailto:giscoord@csc.fi" rel="nofollow"
                  style="text-decoration: underline; color: rgb(0, 109, 175); outline: none;">giscoord@csc.fi</a>.
              Pienemmät aineistot voi lähettää sähköpostin liitteenä, isoimmille sopii hyvin <a
                  href="https://filesender.funet.fi/">FUNET FileSender</a>. FileSenderin tiedostojen kokoraja on 200 Gb.
          </li><br>
          <li>CSC julkaise aineistosi viikon tai kahden sisällä.</li>
      </ol>
      <br>
      <p>Kaikki kysymykset ja kommentit voi lähettää CSC:lle osoitteeseen: giscoord@csc.fi</p>
  </div>`,
      en: `<div class="content-article">

      <h1>Open your spatial data</h1>
  
      <p>Students and personnel of Finnish universities have possibility to publish&nbsp;their own spatial data in
          Paituli. It could be data that has been gathered for a scientific study or a course project. This data could be
          about Finland or any other region in the world. For publishing your data please follow the steps below.</p>
  
      <p>After publishing anybody can download your data. Datasets suitable for <a
              href="http://docs.geoserver.org/latest/en/user/">GeoServer </a>can also be previewed on download page and
          they will be available also as standard OGC web services (WMS, WMTS or WFS). Annually CSC generates a report
          about Paituli usage, including number of downloads for each dataset. This report will be sent to all data
          providers.</p>
  
      <p>CSC publishes data free of charge and will not get any rights for the data.</p>
  
  
      <h3>Steps for publishing your data</h3>
  
      <ol>
          <li>
              <p><strong><span style="font-size:16px;">Make sure the data can be published</span></strong><span
                      style="font-size:16px;">. You should either own the data or be granted the right to publish the data
                      by the data owner. No contractual or intellectual property rights should prohibit opening the data.
                      The data should be licensed with a license allowing reuse.&nbsp;AVAA recommends <a
                          href="https://creativecommons.org/licenses/by/4.0/">Creative Commons BY 4.0</a> license.</span>
              </p>
          </li>
          <li>
              <p><span style="font-size:16px;"><strong>Describe the data</strong>.</span><span style="font-size:16px;"> A
                      description of the data is required in order to publish and the reuse the data. This includes
                      information such as what the data contains, how it was gathered, who owns it etc. The description
                      can be made in <a href="http://etsin.avointiede.fi/en/">Etsin research data finder service</a>.
                      There is no special field for accuracy (scale) and coordinate system, please write these to the
                      "Free description" field on front page. Please fill in also Format and Temporal coverage fields on
                      tab "4. Additional information". If you have more detailed metadata as a file or webpage, also these
                      can be linked to Etsin.</span></p>
          </li>
          <li><strong>Package your data</strong>&nbsp;for download, technical recommendations
              <ul><br>
                  <li>Format: Compressed Geotiff or JPG2000 for raster, Shape or PostGIS dump for vector data, LAZ for
                      laser scanning data.</li>
                  <li>Coordinate system: ETRS-TM35FIN (EPSG:3067) for data about Finland, WGS-84 (EPGS:4326) for global
                      data.</li>
                  <li>Maximum file size 2 Gb.</li>
                  <li>Divide data to map sheets if needed, if you have map sheet index as a separate file, include that to
                      data package</li>
                  <li>Make a .zip file of all the files.</li>
                  <li>These are only recommendations, if you feel some other option would suit your data better, please
                      consult with CSC.</li>
                      <br>
              </ul>
          </li>
          <li>Optional. If you want to use a specific&nbsp;<strong>style</strong>&nbsp;for visualizing your data in WMS
              and WMTS services, make a style description file in <a
                  href="http://docs.geoserver.org/latest/en/user/styling/sld-cookbook/">SLD</a> format and add it to the
              data package. If you are not familiar with SLD, also styles suitable for ArcGIS or QGIS may be submitted.
          </li>
          <li>Write&nbsp;<strong>metadata</strong>&nbsp;about your data to <a
                  href="https://etsin.avointiede.fi/">Etsin</a>. For spatial datasets please include also data about
              scale, format and coordinate system in the free description part. Also filling in the "Temporal coverage"
              field is important. If you have metadata as a document or webpage, add it also to Etsin.</li>
          <li><strong>Send the data and Etsin URN</strong> to&nbsp;<a class="external-link" href="mailto:giscoord@csc.fi"
                  rel="nofollow"
                  style="text-decoration: underline; color: rgb(0, 109, 175); outline: none;">giscoord@csc.fi</a>. Smaller
              datasets may be sent as attachments, for bigger files <a href="https://filesender.funet.fi/">FUNET
                  FileSender</a> is better. FileSender can accept files up to 200 Gb, if your data is bigger or if you
              have problems with uploading, please contact CSC.</li>
          <li>CSC will publish your data to Paituli in a week or two.</li>
      </ol>
  
      <p>If you have any questions, please contact CSC, giscoord@csc.fi</p>
  </div>`,
    },
  },
  home: {
    content: {
      fi: `<div class="content-article">

      <h1>Tervetuloa Paituli-paikkatietopalveluun</h1>
  
      <p>Paituli on paikkatietoaineistojen latauspalvelu. Paituli on ensisijaisesti suunnattu korkeakouluopiskelijoille,
          -tutkijoille sekä henkilökunnan jäsenille, mutta suuri osa aineistoista on avoimia kaikille. Palvelun kautta on
          saatavilla suomalaisia paikkatietoaineistoja, jotka ovat tärkeitä tutkimuksessa ja opetuksessa. Muista
          paikkatietoaineistopalveluista poiketen Paitulista löydät myös historiallisia vuosiversioita. Useiden
          aineistojen ensimmäiset versiot ovat vuodelta 2005, jolloin Paituli aloitti toimintansa. Tällä hetkellä
          palvelusta on ladattavissa Helsingin yliopiston, Ilmatieteen laitoksen, Karelia AMK:n, Kotimaisten kielten
          keskuksen, Maanmittauslaitoksen, Luonnonvarakeskuksen, Maaseutuviraston, Tilastokeskuksen,
          Väestörekisterikeskuksen sekä Väyläviraston, tuottamia paikkatietoaineistoja.</p>
  
      <p>Julkishallinnon aineistojen lisäksi palvelussa on mahdollisuus <a href="/web/paituli/publish">julkaista </a>myös
          korkeakoulujen henkilökunnan tai opiskelijoiden tuottamia paikkatietoaineistoja.</p>
  
      <p>Tarkemman listan saatavilla olevista aineistoista saat <a href="/web/paituli/metadata">Metatiedot</a>-sivulta.
          Aineistoja pääset lataamaan <a href="/web/paituli/latauspalvelu">Latauspalvelusta</a>. Lataussivu tarjoa myös
          esikatselumahdollisuuden suurelle osalle aineistoista. Samat aineistot ovat saatavilla myös WMS-, WMTS-, WCS- ja
          WFS-<a href="/web/paituli/rajapinta">rajapintojen</a> ylitse.</p>
  
      <p>Avoimet aineistot ovat saatavilla palvelusta kaikille ilman kirjautumista. Aineistoilla on erilaisia lisenssejä,
          yleisin lisenssi on CC-BY-4.0. Metatiedot-sivun taulukossa näkyy kaikki palvelussa saatavilla olevat aineistot.
          Aineistojen avoimuus näkyy taulukon viimeisessä sarakkeessa. HAKA-merkinnällä kuvatut aineistot (yksittäiset
          vanhemmat MML:n aineistot) ovat saatavilla vain korkeakoulujen käyttäjille <a
              href="https://confluence.csc.fi/pages/viewpage.action?pageId=29395721">HAKA</a>-kirjautumisen jälkeen.
          Lataussivulla näkyvät vain aineistot, joiden lataukseen käyttäjä on oikeutettu. Kirjautumalla palveluun
          lataussivun valikoihin tulee näkyviin enemmän ladattavia aineistoja. Palveluun kirjaututaan oikeassa yläkulmassa
          olevan linkin kautta.</p>
  
      <p>Paitulin aineistojen metatiedot on tallennettu <a
              href="https://etsin.fairdata.fi/datasets/paituli?keys=&amp;terms=&amp;p=1&amp;sort=best">Etsin-</a>hakupalveluun.
          Metatiedot sisältävät aineiston kuvauksen suomeksi ja englanniksi, yhteystiedot, käyttöehdot ja linkkejä
          lisätietoihin: dokumentteihin ja nettisivuille. Suorat linkit aineistokohtaisille Etsin-sivuille löytyvät
          Metatiedot-sivulta ja lataussivun Metatiedot-välilehdeltä. Muista tutustua paikkatietoaineistoihin liittyviin
          käyttöehtoihin ennen aineistojen käyttöönottoa.</p>
  
      <p>Paitulin PowerPoint <a
              href="/documents/36101/0/CSC_PaITuli_2015.pptx/4ca1a251-5cce-4a6c-9c44-c81528609507">esityskalvot
          </a>(2015).</p>
  
      <p>Paitulin pysyvä linkitettävä osoite: <a href="http://www.csc.fi/paituli">www.csc.fi/paituli</a></p>
      &nbsp;
  
      <p><b>Uutisia:</b></p>
  
      <table style="text-align: left; vertical-align: top;">
          <tbody>
              <tr>
                  <td>7.4.2020</td>
                  <td>LUKE, harvinaisten puulajien esiintymiskartat 1994, 2002, 2009 and 2015 lisätty.</td>
              </tr>
              <tr>
              </tr>
              <tr>
                  <td>27.3.2020</td>
                  <td>Lisätty Maanmittauslaitoksen maastotietokanta, peruskartta, maastokartat ja yleiskartat (rasteri ja
                      vektori, useat mittakaavat), kiinteistörekisterikartta ja paikannimet 2020.</td>
              </tr>
              <tr>
                  <td>28.2.2020</td>
                  <td>Lisätty Maanmittauslaitoksen hallintorajat 2020.</td>
              </tr>
              <tr>
                  <td>27.2.2020</td>
                  <td>Lisätty Tilastokeskuksen tieliikenneonnettomuudet 2018, kuntien avainluvut 2018, Paavo 2020,
                      tuotanto- ja teollisuuslaitokset 2017, väesto kunnittain 2018 ja väestöruutuaineisto 2018.</td>
              </tr>
              <tr>
                  <td>30.1.2020</td>
                  <td>LUKE, Depth-to-Water (DTW) kosteusindeksikartta, 2m lisätty.</td>
              </tr>
              <tr>
                  <td>13.11.2019</td>
                  <td>MML, 10m DEM päivitetty.</td>
              </tr>
              <tr>
                  <td>18.6.2019</td>
                  <td>LUKE, metsien tuulituhoriskikartta lisätty.</td>
              </tr>
              <tr>
                  <td>29.5.2019</td>
                  <td><strong>Kaikki SYKE:n aineistot poistettu Paitulista. </strong>SYKE:n aineistojen lataus onnistuu <a
                          href="http://www.syke.fi/fi-FI/Avoin_tieto/Paikkatietoaineistot">SYKE:n avoin tieto
                          palvelusta</a>.</td>
              </tr>
              <tr>
                  <td>29.5.2019</td>
                  <td>MML, peruskartan teemarasterit 2000 lisätty. Tämä on vanha aineisto, eikä sisällä uudempien
                      peruskartta-aineistojen tapaan paperikartan-näköisiä rastereita. Sen sijaan aineisto sisältää
                      jokaisesta karttalehdestä 3-4 rasteria, joka on tuotettu tulostusvärin mukaan: musta, sininen,
                      keltainen ja violetti..</td>
              </tr>
              <tr>
                  <td>17.5.2019</td>
                  <td>LUKE, Lapinjärvi metsäalueen maalaserkeilausaineisto lisätty.</td>
              </tr>
              <tr>
                  <td>24.4.2019</td>
                  <td>MML:n maastotietokanta 2019 versiona, jossa dataa ei ole jaettu karttalehdittäin, vain koko Suomen
                      saman kohdeluokan datat ovat yhdessä tiedostossa. Kohdeluokkien jaottelu on tarkemmin kuvattu <a
                          href="http://www.nic.funet.fi/index/geodata/mml/maastotietokanta/2019/gpkg/Readme.txt">Readme.txt</a>
                      tiedostosta. Tiedostot ovat isoja (3-35 Gb), joten HTTP, FTP, RSYNC linkkien käyttö lataukseen on
                      suositeltava, ks Linkit välilehdet lataussivun vasemmalla puolella.</td>
              </tr>
              <tr>
              </tr>
              <tr>
                  <td>9.4.2019</td>
                  <td>Lisätty Karelia AMK:n ja LUKE:n tuottamat eroosioriskikartat.</td>
              </tr>
              <tr>
                  <td>4.4.2019</td>
                  <td>Ilmatieteenlaitoksen 10 km sääaineistoja päivitetty, nyt saatavilla data vuosille 1961-2018:
                      päivittäinen alin, ylin ja keskilämpötila, sademäärä, lumen syvyys, ilmanpaine, säteily,
                      suhteellinen kosteus, sekä kuukausittainen keskilämpötila ja sademäärä.</td>
              </tr>
              <tr>
                  <td>3.4.2019</td>
                  <td>Digiroad aineistojen tuottajan nimi muuttui, aikaisemmin Liikennevirsto, nyt Väylävirasto.</td>
              </tr>
              <tr>
                  <td>21.3.2019</td>
                  <td><strong>MML:n laserkeilausaineistoa, 2m DEM ja ortokuva-aineistoja päivitetään Paitulissa joka
                          viikko sunnuntaisin.</strong></td>
              </tr>
          </tbody>
      </table>
  </div>`,
      en: `<div class="content-article">

      <h1>Welcome to Paituli spatial data download service</h1>
  
      <p>Paituli is spatial data download service. Paituli's primary users are students and personnel of Finnish
          universities and polytechnics, but most of the datasets are open to anyone. The service provides datasets that
          are important for research and education. Compared to other spatial data services Paituli includes also
          historical versions of datasets. For many datasets the first version is from 2005, when Paituli started. At the
          moment datasets from following data providers are available: Agency for rural affairs, Finnish Meteorological
          Institute, Institute for the languages of Finland, Karelia UAS, National Land Survey, Natural resource
          institute, Population Register Center, Statistics Finland, Traffic Infrastructure Agency and University of
          Helsinki.</p>
  
      <p>Besides datasets from governmental agencies, also datasets produced by students and personnel of universities and
          polytechnics are <a href="/web/paituli/publish">shared</a>.</p>
  
      <p>Detailed list of available datasets can be found on&nbsp;<a href="/web/paituli/metadata">Metadata</a> page.
          Datasets can be downloaded from <a href="/web/paituli/latauspalvelu">Download data</a> page. Download page
          provides also preview to a big part of the datasets. The same datasets are available via OGC <a
              href="/web/paituli/rajapinta">web services:</a> WMS, WMTS and WFS.</p>
  
      <p>Most of Paituli datasets are available for everybody without logging in. Datasets have different licenses, most
          datasets have CC-BY-4.0 license. On Metadata page all available datasets are listed, the availability of
          datasets is given in the last column. Datasets marked with HAKA (a few older datasets from NLS) are available
          only for users from universities, after logging in via <a
              href="https://confluence.csc.fi/pages/viewpage.action?pageId=29395721">HAKA</a>. On Download data page users
          can see only datasets, which they can download. After logging in there will be more datasets on the Download
          data page, which are hidden from the open version. Log in link is in the top right corner of each page.</p>
  
      <p>Metadata of Paituli datasets is stored to <a
              href="https://etsin.fairdata.fi/datasets/paituli?keys=&amp;terms=&amp;p=1&amp;sort=best">Etsin</a>. Metadata
          includes short description of dataset in Finnish and English, contact information, license terms and if
          available links to additional documents or web pages. Links to dataset specific pages in Etsin can be found on
          Metadata page or on Download page's Metadata tab. Please remember to read the license terms before downloading
          the datasets.</p>
  
      <p>PaITuli's permanent link: <a href="http://www.csc.fi/paituli">www.csc.fi/paituli</a></p>
  
      <p>Paituli's PowerPoint <a
              href="https://avaa.tdata.fi/documents/36101/0/CSC_PaITuli_2015.pptx/4ca1a251-5cce-4a6c-9c44-c81528609507"
              id="yui_patched_v3_11_0_1_1525269122068_740">presentation </a>(2015).</p>
  
      <p><b>News:</b></p>
  
      <table style="text-align: left; vertical-align: top;">
          <tbody>
              <tr>
                  <td>7.4.2020</td>
                  <td>National Resource Institute Occurrence maps for less common tree species 1994, 2002, 2009 and 2015
                      have been added.</td>
              </tr>
              <tr>
                  <td>27.3.2020</td>
                  <td>National Land Survey: topographic database, basic map, topographic map and general map (all scales,
                      vector and raster), cadastral index map and place names 2020 have been added.</td>
              </tr>
              <tr>
                  <td>27.2.2020</td>
                  <td>National Land Survey: administrative borders 2020 have been added.</td>
              </tr>
              <tr>
                  <td>27.2.2020</td>
                  <td>Statistics Finland: road accidents 2018, Paavo 2020, key figures for municipalities 2018, population
                      grid data 2018, population by municipalities 2018 and production and industrial facilities 2017 have
                      been added.</td>
              </tr>
              <tr>
                  <td>30.1.2020</td>
                  <td>LUKE, cartographic Depth-to-Water (DTW) index map, 2m added.</td>
              </tr>
              <tr>
                  <td>13.11.2019</td>
                  <td>NLS 10m DEM updated.</td>
              </tr>
              <tr>
                  <td>18.6.2019</td>
                  <td>LUKE, forest wind damage sensitivity map added.</td>
              </tr>
              <tr>
                  <td>29.5.2019</td>
                  <td><strong>All SYKE datasets were removed from Paituli.</strong> Datasets from SYKE can be downloaded
                      from <a href="http://www.syke.fi/en-US/Open_information/Spatial_datasets">SYKE's open information
                          service</a>.</td>
              </tr>
              <tr>
                  <td>29.5.2019</td>
                  <td>NLS basic map thematic layers 2000 added. It is old dataset and differs from later basic maps. This
                      dataset includes rasters according to map color.</td>
              </tr>
              <tr>
                  <td>17.5.2019</td>
                  <td>LUKE, Lapinjärvi forest terrestial lidar added.</td>
              </tr>
              <tr>
                  <td>24.4.2019</td>
                  <td>NLS Topographic database 2019 available as nine files for whole Finland in GeoPackage format. The
                      data is not divided to mapsheets, but to thematic files. See the <a
                          href="http://www.nic.funet.fi/index/geodata/mml/maastotietokanta/2019/gpkg/Readme.txt">Readme.txt</a>
                      file for details. The files are big (3-35 Gb), so use the HTTP, FTP, RSYNC links for download, see
                      the links tab on the left.</td>
              </tr>
              <tr>
                  <td>9.4.2019</td>
                  <td>Erosion risk maps for agricultural fields by Karelia UAS and LUKE added.</td>
              </tr>
              <tr>
                  <td>4.4.2019</td>
                  <td>FMI's following 10 km datasets have been updated, so that now data is available for years 1961-2018:
                      daily average, mean and maximum temperature, precipitation, snow, radiation, sea level pressure,
                      relative humidity, and monthly average temperature and precipitation. .</td>
              </tr>
              <tr>
                  <td>3.4.2019</td>
                  <td>Digiroad datasets provider name changed from Traffic Agency to Traffic Infrastructure Agency.</td>
              </tr>
              <tr>
                  <td>21.3.2019</td>
                  <td>National Land Board's lidar data, 2m DEM and orthophotos are updated every sunday.</td>
              </tr>
          </tbody>
      </table>
  </div>`,
    },
  },
  metadata: {
    content: {
      fi: `<div class="content-article" width:100%>
      <h1>Paikkatietoaineistojen metatiedot</h1>
    
      <p>
        Alla oleva taulukko sisältää kaikki PaITulin kautta saatavilla olevat
        paikkatietoaineistot. Kutakin riviä klikkaamalla voi siirtyä kyseisen
        aineiston lataukseen. Taulukko sisältää myös linkit aineistojen
        metatietoihin Etsin-palvelussa ja käyttöehtojen lataukseen. Metatiedot
        sisältävät paikkatietoaineistojen yleiskuvauksen ja linkit aineistoihin
        liittyviin dokumentteihin sekä aineistotuottajan itse tuottamiin
        aineistokuvauksiin. Metatiedoista löydät myös yhteystiedot
        aineistotuottajaan.
      </p>
    
      <p>
        Taulukkoa voi järjestää klikkaamalla halutun sarakkeen otsikkoa tai
        suodattaa kirjoittamalla hakutermi otsikon alla olevaan kenttään.
      </p>
    </div>`,
      en: `<div class="content-article">
      <h1>Metadata of Paituli spatial data</h1>
    
      <p>
        The table below lists all the datasets available in Paituli. With clicking
        the row, it is easy to move to the download page of the selected dataset.
        The table has also links to more detailed metadata and license terms of
        specific datasets. Metadata and license terms are stored in Etsin service.
        Metadata includes short description of dataset in Finnish and English,
        contact information, license terms and if available links to additional
        documents or web pages.
      </p>
    
      <p>
        It is possible to order the table with clicking the headers or filter the
        contents with writing a search word below the header.
      </p>
    </div>
    `,
    },
  },
  webservices: {
    content: {
      fi: `<div class="content-article">
      <h1>Paituli web services</h1>
    
      <p>
        Several Paituli datasets are available as OGC web services: WMS, WFS, WMTS.
        WFS service is available only for vector datasets. All datasets available
        via web services are listed at the end of this page.
      </p>
    
      <p>
        The license terms are the same for data downloaded via web services as via
        download service. The license terms and descriptions can be found from
        <a href="/web/paituli/metadata">Metadata </a>page.
      </p>
    
      <p>The web services are available from these connection URLs:</p>
    
      <h4>Open datasets</h4>
    
      <table>
        <tbody>
          <tr>
            <td><strong>Standard</strong></td>
            <td><strong>Connection URL</strong></td>
          </tr>
          <tr>
            <td>WMS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wms?</td>
          </tr>
          <tr>
            <td>WMTS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/gwc/service/wmts?</td>
          </tr>
          <tr>
            <td>WFS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wfs?</td>
          </tr>
          <tr>
            <td>WCS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wcs?</td>
          </tr>
        </tbody>
      </table>
    
      <h4>
        Datasets, that are available for students and personnel of Finnish
        universities for academic use
      </h4>
    
      <div id="paituli_protected_message" style="display: block;">
        Description of protected web services is available only for
        <a href="https://avaa.tdata.fi/c/portal/login">logged in</a> users..
      </div>
    
      <div id="paituli_protected_div" style="display: none">
        <table>
          <tbody>
            <tr>
              <td><strong>Service</strong></td>
              <td><strong>URL</strong></td>
            </tr>
            <tr>
              <td>WMS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wms?</td>
            </tr>
            <tr>
              <td>WMTS</td>
              <td>
                http://avaa.tdata.fi/geoserver/paituli_protected/gwc/service/wmts?
              </td>
            </tr>
            <tr>
              <td>WFS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wfs?</td>
            </tr>
            <tr>
              <td>WCS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wcs?</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>
                <div id="username">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <div id="pwd">&nbsp;</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <p>
        WMTS-service's gridsets: ERTS-TM35-FIN (EPSG:3067,
        <a
          href="http://docs.jhs-suositukset.fi/jhs-suositukset/JHS180_liite1/JHS180_liite1.html#H7"
          >JHS180</a
        >) and Spherical Mercator (EPSG:3857).
      </p>
    
      <h4>Guidelines</h4>
    
      <ul>
        <li>
          <a href="https://research.csc.fi/gis-guidelines">Guidelines</a> for using
          web services.
        </li>
        <li>
          Examples of using AVAA web services with OpenLayers library, can be found
          on AVAA <a href="/openstreetmap">OpenStreetMap</a> page.
        </li>
      </ul>
    
      <h4>Datasets available as web services</h4>
    </div>`,
      en: `<div class="content-article">
      <h1>Paituli web services</h1>
    
      <p>
        Several Paituli datasets are available as OGC web services: WMS, WFS, WMTS.
        WFS service is available only for vector datasets. All datasets available
        via web services are listed at the end of this page.
      </p>
    
      <p>
        The license terms are the same for data downloaded via web services as via
        download service. The license terms and descriptions can be found from
        <a href="/web/paituli/metadata">Metadata </a>page.
      </p>
    
      <p>The web services are available from these connection URLs:</p>
    
      <h4>Open datasets</h4>
    
      <table>
        <tbody>
          <tr>
            <td><strong>Standard</strong></td>
            <td><strong>Connection URL</strong></td>
          </tr>
          <tr>
            <td>WMS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wms?</td>
          </tr>
          <tr>
            <td>WMTS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/gwc/service/wmts?</td>
          </tr>
          <tr>
            <td>WFS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wfs?</td>
          </tr>
          <tr>
            <td>WCS</td>
            <td>http://avaa.tdata.fi/geoserver/paituli/wcs?</td>
          </tr>
        </tbody>
      </table>
    
      <h4>
        Datasets, that are available for students and personnel of Finnish
        universities for academic use
      </h4>
    
      <div id="paituli_protected_message" style="display: block;">
        Description of protected web services is available only for
        <a href="https://avaa.tdata.fi/c/portal/login">logged in</a> users..
      </div>
    
      <div id="paituli_protected_div" style="display: none">
        <table>
          <tbody>
            <tr>
              <td><strong>Service</strong></td>
              <td><strong>URL</strong></td>
            </tr>
            <tr>
              <td>WMS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wms?</td>
            </tr>
            <tr>
              <td>WMTS</td>
              <td>
                http://avaa.tdata.fi/geoserver/paituli_protected/gwc/service/wmts?
              </td>
            </tr>
            <tr>
              <td>WFS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wfs?</td>
            </tr>
            <tr>
              <td>WCS</td>
              <td>http://avaa.tdata.fi/geoserver/paituli_protected/wcs?</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>
                <div id="username">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <div id="pwd">&nbsp;</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <p>
        WMTS-service's gridsets: ERTS-TM35-FIN (EPSG:3067,
        <a
          href="http://docs.jhs-suositukset.fi/jhs-suositukset/JHS180_liite1/JHS180_liite1.html#H7"
          >JHS180</a
        >) and Spherical Mercator (EPSG:3857).
      </p>
    
      <h4>Guidelines</h4>
    
      <ul>
        <li>
          <a href="https://research.csc.fi/gis-guidelines">Guidelines</a> for using
          web services.
        </li>
        <li>
          Examples of using AVAA web services with OpenLayers library, can be found
          on AVAA <a href="/openstreetmap">OpenStreetMap</a> page.
        </li>
      </ul>
    
      <h4>Datasets available as web services</h4>
    </div>
    `,
    },
  },
  footer: {
    text: {
      fi:
        'ATT-hanke on opetus- ja kulttuuriministeriön rahoittama hanke, jonka tavoitteena on, että vuoteen 2017 mennessä Suomi nousee yhdeksi johtavista maista tieteen ja tutkimuksen avoimuudessa.',
      en:
        'Open science and research is an initiative funded by the Ministry of Education and Culture with the target of making Finland one of the leading countries in openness of science and research by the year 2017.',
    },
    ministryLogo: {
      fi: './okm-logo-fi.gif',
      en: '../okm-logo-en.png',
    },
    avoinLogo: {
      fi: './ATT_pos_pysty_RGB_FI_transparent.png',
      en: './ATT_pos_pysty_RGB_EN_transparent.png',
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

const translate = (field) => byString(translations, field + '.' + locale)
const getCurrentLocale = () => locale
const changeLocale = (l) => (locale = l)

export { translate, getCurrentLocale, changeLocale }
