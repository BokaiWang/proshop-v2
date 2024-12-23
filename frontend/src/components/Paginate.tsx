import React, { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
}

const Paginate: FC<PaginateProps> = ({ pages, page, isAdmin = false }) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        return (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: isAdmin ? "/admin/product-list" : "",
              search: `page=${x + 1}`,
            }}
            isActive={(match, location) => {
              const queryString = new URLSearchParams(location.search);
              return Number(queryString.get("page")) === x + 1;
            }}
          >
            <Pagination.Item>{x + 1}</Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  ) : null;
};

export default Paginate;
