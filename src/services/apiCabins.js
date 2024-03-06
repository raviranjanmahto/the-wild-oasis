import supabase, { supabaseUrl } from "./supabase";

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. CREATE CABIN
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) throw new Error("Cabin could not be created");

  // 2. UPLOAD IMAGE
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. DELETE IMAGE FROM SUPABASE IF THERE WAS AN ERROR UPLOADING IMAGE
  if (storageError) {
    await supabase.storage.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded and cabin was not created");
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could not get loaded");

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin could not be deleted");
}
