import { useQuery } from "@tanstack/react-query";
import { isValid, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  const queryDate = subDays(new Date(), numDays);
  const isValidDate = isValid(new Date(queryDate));

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => {
      if (isValidDate) return getBookingsAfterDate(queryDate.toISOString());
    },
    queryKey: ["bookings", `last-${numDays}`],
    enabled: isValidDate,
  });
  return { bookings, isLoading };
}
