import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import qs from "qs";

const LandmarkList = ({ landmarks, loading, curPage, lastPage, error }) => {
  const [pages, setPages] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [next, setNext] = useState(-1);

  useEffect(() => {
    const chunk = Math.floor((curPage - 1) / 5);
    const sp = chunk * 5; // start page
    const ep = Math.min(sp + 5, lastPage); // end page
    const ar = [];
    for (var i = sp; i < ep; ++i) {
      ar.push(i + 1);
    }
    setPages(ar);
    setPrev(sp === 0 ? -1 : sp);
    setNext(ep === lastPage ? -1 : ep + 1);
  }, [curPage, lastPage]);

  const buildLink = ({ page }) => {
    const query = qs.stringify({ page });
    return `/?${query}`;
  };

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Comment</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading &&
            landmarks &&
            landmarks.map((item, i) => (
              <Table.Row key={i * 1000}>
                <Table.Cell key={i * 1000 + 1}>jjuiddong</Table.Cell>
                <Table.Cell key={i * 1000 + 2}>
                  {item.date_time.slice(0, 10)}
                </Table.Cell>
                <Table.Cell key={i * 1000 + 3}>
                  {item.address}
                </Table.Cell>
                <Table.Cell key={i * 1000 + 4}>
                  {item.comment}
                </Table.Cell>                
              </Table.Row>
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item disabled={prev===-1} 
                as={prev===-1? "" : Link}
                to={buildLink({ page: prev })}
                icon>
                  <Icon name="chevron left" />
                </Menu.Item>

                {pages.map((i) => (
                  <Menu.Item
                    disabled={i === curPage ? true : false}
                    as={i === curPage ? "" : Link}
                    key={i}
                    to={buildLink({ page: i })}
                  >
                    {i}
                  </Menu.Item>
                ))}

                <Menu.Item 
                disabled={next===-1} 
                as={next===-1? "" : Link}
                to={buildLink({ page: next })}
                icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default LandmarkList;
