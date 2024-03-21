import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function createEditGuest(newGuest, id) {
  // 1. CREATE/EDIT GUEST
  let query = supabase.from("guests");

  // A. CREATE
  if (!id) query = query.insert([{ ...newGuest }]);

  // B. EDIT
  if (id) query = query.update({ ...newGuest }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Guest could not be created");

  return data;
}

export async function getGuests({ sortBy, page, search }) {
  if (!Number.isSafeInteger(page) || page <= 0) return { data: [], count: 0 };
  let query = supabase
    .from("guests")
    .select(
      "id, created_at, fullName, email, nationalID, nationality, countryFlag",
      { count: "exact" }
    );

  // Apply search filter
  if (search) {
    query = query.ilike(`fullName`, `%${search}%`);
  }

  // SORT;
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (count === null) return { data: [], count: 0 };

  if (error) throw new Error("Guests could not get loaded");

  return { data, count };
}

export async function deleteGuest(id) {
  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) throw new Error("Guest could not be deleted");
}
