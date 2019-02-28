import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, CardTitle, CardText, Row, Col, CardImg , Pagination, PaginationItem, PaginationLink  } from 'reactstrap';


import Repository from "./RepositoryComponent";
//import {Redirect, Route, Switch} from "react-router-dom";


class Users extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            users: null,
            nroPage: 1,
            pageOne: 1,
            pageTwo: 2,
            pageThree: 3,
            pageFour: 4,
            pageFive: 5,
            userRepository: null
        };
        console.log("Main constructor es invocado");
        //this.handleClick = this.handleClick.bind(this);
    }


     componentDidMount() {
        console.log("didmount " + this.state.nroPage);
        //window.scrollTo(0, 0);
        this.getFromGithub();
    }

    getFromGithub() {
        //console.log(this.state.nroPage);
        /*
        axios.get(`https://api.github.com/search/users?q=type:user&page=${this.state.nroPage}&per_page=30`)
          .then(res => {
            const users = res.data.items;
            const message = res.data.message;
            console.log(message);
            
            this.setState({ users });
            
            //    alert("Only the first 1000 search results are available");
            
            //console.log(persons);
            //console.log(this.state.persons);
          });

*/

          axios.get(`https://api.github.com/search/users?q=type:user&page=${this.state.nroPage}&per_page=30`)
          .then(response => {
                console.log("*****************");
                const users = response.data.items;
               this.setState({ users },()=>console.log(users));
                
            }).catch(error => {
                console.log(error);
                alert("Only the first 1000 search results are available in GITHUB API REST");
          });
    }



    createCarnets(image, name, key,html_url,userRepo){
      return (<Col sm="3" key={key}>
              <CardImg top width="100%" src={image} alt="Card image cap" />
                <Card body>
                  <CardTitle>{name}</CardTitle>
                  <Button href={html_url} target="_blank">Account</Button>
                  <Link to={`/repository/${name}`}>
                      Repositories
                  </Link>
                </Card>
              </Col>);
    }

    handleClick(page) {
      
      console.log("clickaste " + page);
      if(typeof page == "number"){
          //console.log("number");

          this.setState({ nroPage:page }, ()=>{this.componentDidMount()});
      }
      else
      switch(page){
        case "first":
            this.setState({
              pageOne: 1,
              pageTwo: 2,
              pageThree: 3,
              pageFour: 4,
              pageFive: 5
          });
          break;
        case "last":
            this.setState({
                pageOne: 31,
                pageTwo: 32,
                pageThree: 33,
                pageFour: 34,
                pageFive: 35
            });
            break;
        case "minusFive":
            if(this.state.pageOne-5 > 0){
                this.setState({
                  pageOne: this.state.pageOne - 5,
                  pageTwo: this.state.pageTwo - 5,
                  pageThree: this.state.pageThree - 5,
                  pageFour: this.state.pageFour - 5,
                  pageFive: this.state.pageFive - 5
                });
            }
            break;
        case "plusFive":
            if(this.state.pageOne+5 < 35){
                this.setState({
                  pageOne: this.state.pageOne + 5,
                  pageTwo: this.state.pageTwo + 5,
                  pageThree: this.state.pageThree + 5,
                  pageFour: this.state.pageFour + 5,
                  pageFive: this.state.pageFive + 5
                });
            }
            break;
      }
    
        //console.log(this.state);
    }


    createPagination() {
          return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick("first")}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" onClick={()=>this.handleClick("minusFive")}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick(this.state.pageOne)}>
            {this.state.pageOne}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick(this.state.pageTwo)}>
            {this.state.pageTwo}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick(this.state.pageThree)}>
            {this.state.pageThree}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick(this.state.pageFour)}>
            {this.state.pageFour}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>this.handleClick(this.state.pageFive)}>
            {this.state.pageFive}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" onClick={()=>this.handleClick("plusFive")}/>
        </PaginationItem>
        <PaginationLink href="#" onClick={()=>this.handleClick("last")}>
            Last
        </PaginationLink>
      </Pagination>
    );
  }



    render() {
      console.log("renderizando papu");
      const users = this.state.users;
        

        if(users == null){
          console.log('users is null');
          return <div></div>;
        }
          

       let listaCarnets = [];
       for (var i = 0; i < users.length; i++) {
          listaCarnets.push(this.createCarnets(users[i].avatar_url, 
                                              users[i].login, 
                                              users[i].id,
                                              users[i].html_url));
          //console.log(users[i].avatar_url);
        }
        
        return (<div>
                        <Container>
                          <Row>{listaCarnets}</Row>
                          <Row >{this.createPagination()}</Row>
                        </Container>
                    </div>
              );
    }

}
export default Users;


