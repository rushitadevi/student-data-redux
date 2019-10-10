export default function(state = {}, action) {
    switch(action.type)
    {
    case "REQUEST_POSTS":
            return {
              ...state,
              loader: !state.loader,              
            }
    case "ADD_STUDENT":
                return {
                    ...state.students,
                  students : state.students.concat(action.payload)   
                 }
    case "FETCH_STUDENT":
      return {
        ...state.students,
        students :state.students.concat(action.payload)   
      }
      case "DELETE_STUDENT":
        console.log(state)
          const studentToremove = state.students.findIndex(
            _id => _id == action.payload
          );
          console.log(action.payload,"student")
      return {
        ...state.students,
        students :state.students.slice(0,studentToremove),
        ...state.students.slice(studentToremove + 1) 
      }
            default :
            return  state;
   
        }
}