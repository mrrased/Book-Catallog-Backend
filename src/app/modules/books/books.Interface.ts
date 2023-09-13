export type IBooksFilterRequest = {
  searchTerm?: string | undefined;
  price?: string | undefined;
  genre?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  categoryId?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
};
