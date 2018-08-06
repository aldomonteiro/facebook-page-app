import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const PageListItem = ({ id, name, pictureUrl }) => (
  <Link className="list-item" to={`/page/${id}`}>
      {pictureUrl && <Image src={pictureUrl} rounded/>}
      <h3 className="list-item__title">{name}</h3>
  </Link>
);

export default PageListItem;
