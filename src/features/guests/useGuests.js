import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // SEARCH
  const search = searchParams.get("search") || "";

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const {
    data: { data: guests, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", search, sortBy, page],
    queryFn: () => getGuests({ sortBy, page, search }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", search, sortBy, page + 1],
      queryFn: () => getGuests({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", search, sortBy, page - 1],
      queryFn: () => getGuests({ sortBy, page: page - 1 }),
    });

  return { guests, isLoading, error, count };
}
