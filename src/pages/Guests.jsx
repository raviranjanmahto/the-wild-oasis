import AddGuest from "../features/guests/addGuest";
import GuestTable from "../features/guests/guestTable";
import GuestTableOperations from "../features/guests/guestTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Guests = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All guests</Heading>
        <GuestTableOperations />
      </Row>
      <Row type='vertical'>
        <GuestTable />
      </Row>
    </>
  );
};

export default Guests;
