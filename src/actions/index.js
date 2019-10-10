export const handleAddStudent = state => {
    return async (dispatch, getState) => {
        let url =
        "http://localhost:3450/students/" ;
      let headers = new Headers({
        "Content-Type": "application/json"
      });
      console.log(state,"lo")
      var response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(state.student),
      headers: headers
      });
      if (response.ok) {
        var jSON = await response.json();
      }
      //do async code here
      dispatch({
        type: "ADD_STUDENT",
        payload: jSON
      });
    };
  };