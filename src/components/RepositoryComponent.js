import React, {Component} from 'react';
import axios from 'axios';
import {Pagination, PaginationLink, Row, Breadcrumb, BreadcrumbItem, Card, CardText, Container, Col, CardTitle, Button} from "reactstrap";
import {Link} from "react-router-dom";


class Repository extends Component{
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            repositories:null,
            nroPage: 1,
            limite: false
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


          axios.get(`https://api.github.com/users/${this.props.userName}/repos?per_page=30&page=${this.state.nroPage}`)
          .then(response => {
                console.log("*****************");
                const repositories = response.data;
                console.log(repositories.length);
                if(repositories.length == 0){
                  alert("The user doesn't have more repositories");
                  this.setState({limite : true});
                }else{
                  this.setState({ repositories, limite: false },()=>{
                          console.log("repositories");
                          //this.forceUpdate();
                      });
                }
               
                
            }).catch(error => {
                console.log(error);
                alert("Only the first 1000 search results are available in GITHUB API REST");
          });
    }

    createRepositories( url, name, description, key){
      return (<Col sm="3" key={key}>
                <Card body>
                  <CardTitle>{name}</CardTitle>
                  <CardText>{description}</CardText>
                  <Button href={url} target="_blank"> Go to repository</Button>
                </Card>
              </Col>);
    }


    render() {

        console.log("renderizando papu");
        const repos = this.state.repositories;
        

        if(repos == null){
          console.log('repositories is null');
          return <div>User has not more repositories.</div>;
        }
        
        let listaCarnets = [];
       for (var i = 0; i < repos.length; i++) {
          listaCarnets.push(this.createRepositories(
                                              repos[i].html_url, 
                                              repos[i].name, 
                                              repos[i].description,
                                              repos[i].id));
          //console.log(users[i].avatar_url);
        }

        const home = ()=>{
              return ( 
              <Link to={`/users`}>
                   <Button color="primary">Back Users</Button>
              </Link>);
        };
        
        return (<div>
                        <Container>
                          <Row>{home()}</Row>
                          <Row>{listaCarnets}</Row>
                          <Row >{this.createPagination()}</Row>
                          <Row>{home()}</Row>
                        </Container>
                    </div>
        );//fin return
    }

    handleClick(event) {
      switch(event) {
          case "prev":
            if(this.state.nroPage > 1)
            this.setState({
              nroPage: this.state.nroPage - 1
            },()=>{this.getFromGithub()});
          break;
          case "next":
            if(this.state.limite == false)
            this.setState({
              nroPage: this.state.nroPage + 1
            },()=>{this.getFromGithub()});
          break;
      }
    }

    createPagination() {
          return (
      <Pagination aria-label="Page navigation example">
          <PaginationLink href="#" onClick={()=>this.handleClick("prev")}>
            Previous
          </PaginationLink>
          <PaginationLink href="#">
            {this.state.nroPage}
        </PaginationLink>
        <PaginationLink href="#" onClick={()=>this.handleClick("next")}>
            Next
        </PaginationLink>
      </Pagination>
    );
  }
}

export default Repository;