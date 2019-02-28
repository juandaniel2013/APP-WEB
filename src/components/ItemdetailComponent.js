import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";


function RenderItem({item}) {
    if (item != null) {
        return (
            <Card>
                <CardImg width="100%" src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );

    } else {
        return (
            <div/>
        );
    }

}

function RenderComments({comments}) {
    if (comments != null) {
        const commentsItems = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsItems}
                </ul>
            </div>
        );
    } else {
        return (
            <div/>
        );
    }
}


const ItemDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/catalog">Catalog</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.item.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.item.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderItem item={props.item}/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}/>
            </div>
        </div>
    );
};

export default ItemDetail;