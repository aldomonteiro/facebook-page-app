import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const PageListItem = ({ id, name, pictureUrl }) => (
  <Link className="list-item" to={`/page/${id}`}>
    <span>
      {pictureUrl && <Image src={pictureUrl} rounded/>}
      <h3 className="list-item__title">{name}</h3>
    </span>
  </Link>
);

export default PageListItem;
