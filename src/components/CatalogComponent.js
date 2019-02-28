import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";

function RenderCatalogItem({item}) {
    return (
        <Link to={`/catalog/${item.id}`}>
            <Card>
                <CardImg width="100%" src={item.image} alt={item.name}/>
                <CardImgOverlay>
                    <CardTitle>{item.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
    );
}

const Catalog = (props) => {
    var catalog = props.items.map(item => {
        return (
            <div key={item.id} className="col-12 col-md-5 m-1">
                <RenderCatalogItem item={item}/>
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Catalog</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Catalog</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {catalog}
            </div>
        </div>
    );
};

export default Catalog;