import { useQuery } from "@tanstack/react-query";
import { isValid, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  const queryDate = subDays(new Date(), numDays);
  const isValidDate = isValid(new Date(queryDate));

  const { data: stays, isLoading } = useQuery({
    queryFn: () => {
      if (isValidDate) return getStaysAfterDate(queryDate.toISOString());
    },
    queryKey: ["stays", `last-${numDays}`],
    enabled: isValidDate,
  });

  const confirmStays = stays?.filter(
    stay => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, confirmStays, isLoading, numDays };
}
