let selectedFeatures = {}
const getSelectedFeatures = () => selectedFeatures
const setSelectedFeatures = (value) => (selectedFeatures = value)

export default {
  getSelectedFeatures,
  setSelectedFeatures,
}
