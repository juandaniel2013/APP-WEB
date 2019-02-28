import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

function RenderCard({item}) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.jobPosition ? <CardSubtitle>{item.jobPosition}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

const Home = (props) => {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.item}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.employee}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
