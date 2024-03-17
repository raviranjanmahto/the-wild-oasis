import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmStays, numDays, cabinCount }) => {
  // 1. Get number of bookings
  const numBookings = bookings?.length;

  // 2. Get total price
  const sales = bookings
    .filter(booking => booking.status === "checked-in")
    .reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Get number of confirm stays
  const checkins = confirmStays?.length;

  // 4. Occupancy rate
  const occupation = confirmStays.reduce((acc, cur) => acc + cur.numNights, 0);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={occupation}
      />
    </>
  );
};

export default Stats;
