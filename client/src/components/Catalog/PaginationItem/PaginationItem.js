import { Pagination } from "react-bootstrap";

export const PaginationItem = ({number}) => {
    let active = 2;
    return   (
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>

    );
}
