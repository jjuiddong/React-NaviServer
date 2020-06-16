import React, { useState, useEffect } from "react";
import { Icon, Menu, Table, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import qs from "qs";

const JourneyList = ({
  journeys,
  loading,
  curPage,
  lastPage,
  error,
  shows,
  onShowPath,
}) => {
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
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>Show</Table.HeaderCell>
            <Table.HeaderCell width={3}>User</Table.HeaderCell>
            <Table.HeaderCell width={3}>Date</Table.HeaderCell>
            <Table.HeaderCell width={3}>Distance</Table.HeaderCell>
            <Table.HeaderCell width={3}>Journey Time</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading &&
            journeys &&
            journeys.map((item, i) => (
              <Table.Row key={i * 1000}>
                <Table.Cell key={i * 1000 + 1}>
                  <Checkbox
                    slider
                    onClick={onShowPath}
                    index={i}
                    name={item.date}
                    checked={shows.has(item.time_id)? shows.get(item.time_id) : false}
                  ></Checkbox>
                </Table.Cell>
                <Table.Cell key={i * 1000 + 2}>jjuiddong</Table.Cell>
                <Table.Cell key={i * 1000 + 3}>
                  {item.date.slice(0, 10)}
                </Table.Cell>
                <Table.Cell key={i * 1000 + 4}>
                  {(item.distance / 1000).toFixed(3)} Km
                </Table.Cell>
                <Table.Cell key={i * 1000 + 5}>
                  {(item.journey_time / (1000 * 60 * 60)).toFixed(1)} Hour
                </Table.Cell>
                <Table.Cell key={i * 1000 + 6}>Detail</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item
                  disabled={prev === -1}
                  as={prev === -1 ? "" : Link}
                  to={buildLink({ page: prev })}
                  icon
                >
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
                  disabled={next === -1}
                  as={next === -1 ? "" : Link}
                  to={buildLink({ page: next })}
                  icon
                >
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

export default JourneyList;
