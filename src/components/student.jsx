import React from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner'
import { handleAddStudent,handleFetchStudents,handleDeleteStudent } from "../actions";
//const mapStateToProps = state => state;


const mapStateToProps = state => {
  console.log("STATE", state);
  return state;
};

const mapDispatchToProps = dispatch => ({
  requestPosts: () =>
    dispatch({
      type: "REQUEST_POSTS"
    }),
    addStudentThunk: state => dispatch(handleAddStudent(state)) ,
    fetchStudents: () => dispatch(handleFetchStudents()),
    deleteStudent: id => dispatch(handleDeleteStudent(id))
});

class student extends React.Component {
  constructor() {
    super();
    this.state= {
      students: [],
      student :{
        name:"",
        surname:"",
        email:""
      }
    }
  }

  componentDidMount = async () => {
    this.props.fetchStudents()
  };

  componentDidUpdate = async () => {
  };

  // deleteStudent = async e => {
  //   var studID = e.currentTarget.value;
  //   console.log("hi")
    
  // };

  addData = (input)=>{
    var newstudent = this.state.student; //we are taking one object here
    
    var currentValue = input.currentTarget.value
    var currentId=input.currentTarget.id
    if(currentId==="name")
    {
        newstudent.name=currentValue
    }
    if(currentId==="surname")
    newstudent.surname=currentValue
    if(currentId==="email")
    newstudent.email=currentValue
    // if(currentId==="DateOfBirth")
    // newstudent.DateOfBirth=Date.parse(currentValue)
    //console.log("newSude",newstudent)
    this.setState({
        student:newstudent
    })
    
  }

  render() {
    console.log(this.props.students,"PP")
    return (
      <>
        <div className="container mt-5">
          <ListGroup >
            <h1><b>Students List</b></h1>
            <ListGroupItem >
                <input type="text" id="name"  onChange={this.addData}  value={this.state.student.name}  />
                <input type="text" id="surname" name="SURNAME"  onChange={this.addData}  value={this.state.student.surname}/>
                <input type="text" id="email" name="EMAIL"  onChange={this.addData} value={this.state.student.email}/>
                <input type="Date" id="dateOfBirth" name="DateOfBirth"  onChange={this.addData} value={this.state.student.dateOfBirth}/>
                <input type="button" name="Add" value="Add" style={{float:"right"}} 
                onClick={() =>{this.props.addStudentThunk(this.state.student);this.props.requestPosts()}}  />
            </ListGroupItem>
          </ListGroup>
           {this.props.loader ?  <Loader type="Bars" color="#00BFFF"  height={100}  width={100}/>  :  
                         this.props.students && this.props.students.map((x, index) => (
                          <div class="row no-gutters">
                            {index % 2 === 0 ? (
                              <ListGroup className="mt-4" style={{ width: "100%" }}>
                                <ListGroupItem className="justify-content-between  list-group-item-warning">
                                  <b>
                                  
                                    {x.name} {x.surname}  {x.email}
                                  </b>
                                  <Badge pill color="success"></Badge>
                                 
                                  <Button
                                    color="danger"
                                    style={{ float: "right" }}
                                    onClick={()=>this.props.deleteStudent(x._id)}
                                    value={x._id}
                                  >
                                    Delete
                                  </Button>
                                </ListGroupItem>
                              </ListGroup>
                            ) : (
                              <ListGroup className="mt-4" style={{ width: "100%" }}>
                                <ListGroupItem className="justify-content-between  list-group-item-info">
                                  <b>{x.name} {x.surname}</b>
                                  <Badge pill color="success"></Badge>
                                                      <Button
                                    color="danger"
                                    style={{ float: "right" }}
                                    onClick={()=>this.props.deleteStudent(x._id)}
                                    value={x._id}
                                  >
                                    Delete
                                  </Button>
                                </ListGroupItem>
                              </ListGroup>
                             
                            )}
                          </div>
                        ))
           }
          
            { }
        
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(student);
