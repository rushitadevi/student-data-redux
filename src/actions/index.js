
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
        body: JSON.stringify(state),
      headers: headers
      });
      if (response.ok) {
        var jSON = await response.json();
      }
      
      dispatch({
        type: "ADD_STUDENT",
        payload: jSON
      });
    };
  };

  export const handleFetchStudents =()=>{
    return async(dispatch)=>{
      var response = await fetch("http://localhost:3450/students", {
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
  
      var jSON = await response.json();
     
      dispatch({
        type: "FETCH_STUDENT",
        payload: jSON
      });
    }
  }

  export const handleDeleteStudent=studId=>{
    return async(dispatch)=>{
      try {
        let url = "http://localhost:3450/students/" + studId;
          var response = await fetch(url, {
        method: "DELETE"
      });
      var jSon = await response.json();
      dispatch({
        type: "DELETE_STUDENT",
        payload: studId
      });
    } catch {}
    }
  }