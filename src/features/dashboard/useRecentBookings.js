import { useQuery } from "@tanstack/react-query";
import { isValid, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useEffect } from "react";

export function useRecentBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  const queryDate = subDays(new Date(), numDays);
  const isValidDate = isValid(new Date(queryDate));

  useEffect(() => {
    if (!isValidDate && searchParams.get("last")) searchParams.set("last", 7);
    setSearchParams(searchParams);
  }, [isValidDate, searchParams, setSearchParams]);

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate.toISOString()),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { bookings, isLoading };
}
