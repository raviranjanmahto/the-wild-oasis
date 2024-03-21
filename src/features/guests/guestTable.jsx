import Spinner from "../../ui/Spinner";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useGuests } from "./useGuests";
import GuestRow from "./guestRow";
import Pagination from "../../ui/Pagination";

const GuestTable = () => {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;
  if (!guests?.length) return <Empty resourceName='guests' />;

  return (
    <Menus>
      <Table columns='1.4fr 1.3fr 1fr 1.4fr 0.9fr 0.1fr'>
        <Table.Header>
          <div>fullName</div>
          <div>Email</div>
          <div>National ID</div>
          <div>Nationality</div>
          <div>Country Flag</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={guest => <GuestRow key={guest.id} guest={guest} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default GuestTable;
