import React from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner'
import { handleAddStudent } from "../actions";
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
    handleAddStudent : state =>
    dispatch({
      type :"ADD_STUDENT",
     payload : state
    }),
    addStudentThunk: state => dispatch(handleAddStudent(state)) //I have put the actions in a separate file! ;)
   
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
    var response = await fetch("http://localhost:3450/students", {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    var jSON = await response.json();
    this.setState({
      students: jSON
    });
  
  };

  componentDidUpdate = async () => {
    var response = await fetch("http://localhost:3450/students", {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    var jSON = await response.json();
    this.setState({
      students: jSON
    });
  //  this.props.requestPosts()   
  };

  deleteStudent = async e => {
    var studID = e.currentTarget.value;
    try {
        let url = "http://localhost:3450/students/" + studID;
          var response = await fetch(url, {
        method: "DELETE"
      });
      var jSon = await response.json();
    } catch {}
  };

  // addStudent = async()  => {
  //  // console.log("jii")
  //  this.props.requestPosts() 
  //   // let url =
  //   //     "http://localhost:3450/students/" ;
  //   //   let headers = new Headers({
  //   //     "Content-Type": "application/json"
  //   //   });
  //   //   var response = await fetch(url, {
  //   //     method: "POST",
  //   //     body: JSON.stringify(this.state.student),
  //   //   headers: headers
  //   //   });
  //   //   if (response.ok) {
  //   //     var jSON = await response.json();
  //   //   }
       
  //     //this.state.students.push(jSON,"loo")
  //     //this.setState({ students:this.state.students });
  //     this.props.requestPosts()
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
    console.log("newSude",newstudent)
    this.setState({
        student:newstudent
    })
    
  }

  render() {
    console.log(this.state.student,"PP")
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
                <input type="button" name="Add" value="Add" style={{float:"right"}} onClick={() =>this.props.addStudentThunk(this.state.student)}  />
                <input type="button" name="Add" value="Req" style={{float:"right"}}  
                  />
            </ListGroupItem>
          </ListGroup>
           {this.props.loader ?  <Loader type="Bars" color="#00BFFF"  height={100}  width={100}/>  :  
                         this.state.students && this.state.students.map((x, index) => (
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
                                    onClick={this.deleteStudent}
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
                                    onClick={this.deleteStudent}
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
