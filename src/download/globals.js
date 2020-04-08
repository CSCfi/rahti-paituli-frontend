let selectedFeatures = {}
const getSelectedFeatures = () => selectedFeatures
const setSelectedFeatures = (value) => (selectedFeatures = value)

let indexLayer = null
const getIndexLayer = () => indexLayer
const setIndexLayer = (value) => (indexLayer = value)

export default {
  getSelectedFeatures,
  setSelectedFeatures,
  getIndexLayer,
  setIndexLayer,
}
