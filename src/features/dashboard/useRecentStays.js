import { useQuery } from "@tanstack/react-query";
import { isValid, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useEffect } from "react";

export function useRecentStays() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  const queryDate = subDays(new Date(), numDays);
  const isValidDate = isValid(new Date(queryDate));

  useEffect(() => {
    if (!isValidDate && searchParams.get("last")) searchParams.set("last", 7);
    setSearchParams(searchParams);
  }, [isValidDate, searchParams, setSearchParams]);

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate.toISOString()),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmStays = stays?.filter(
    stay => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, confirmStays, isLoading, numDays };
}
