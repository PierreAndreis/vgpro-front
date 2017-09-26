export const fetchRegions = () => {
  return {
    type: 'REGIONS_FETCH_REQUEST'
  }
}

export const changeRegion = (region) => {
  return {
    type: 'REGION_SWITCH',
    region
  }
}

export const toggleRegion = () => {
  return {
    type: 'REGION_TOGGLE'
  }
}