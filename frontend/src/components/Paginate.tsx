import React, { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

interface PaginateProps {
  pages: number;
  page: number;
}

const Paginate: FC<PaginateProps> = ({ pages, page }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        searchParams.set("page", `${x + 1}`);
        return (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: location.pathname,
              search: searchParams.toString(),
            }}
            isActive={(match, location) => page === x + 1}
          >
            <Pagination.Item>{x + 1}</Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  ) : null;
};

export default Paginate;
