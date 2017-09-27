import API from "./../api";


export const fetchProFeed = async () => {
/** This is not a redux action */

  return await API.getProFeed();
}