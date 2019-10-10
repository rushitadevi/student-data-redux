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
            default :
            return  state;
   
        }
}