let selectedFeatures = {}
const getSelectedFeatures = () => selectedFeatures
const setSelectedFeatures = (value) => (selectedFeatures = value)

let indexLayer = null
const getIndexLayer = () => indexLayer
const setIndexLayer = (value) => (indexLayer = value)

let dataLayer = null
const getDataLayer = () => dataLayer
const setDataLayer = (value) => (dataLayer = value)

export default {
  getSelectedFeatures,
  setSelectedFeatures,
  getIndexLayer,
  setIndexLayer,
  getDataLayer,
  setDataLayer,
}
