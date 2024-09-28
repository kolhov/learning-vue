import type {Characters, Comics} from "@/types/marvel";
import {Path} from '@/types/marvel'

const apiKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC;
const ITEMS_PER_PAGE = 20;
const MARVEL_API = 'https://gateway.marvel.com:443/v1/public';
const API_SIGN = `apikey=${apiKey}`;

function getPagination(page?: number) {
  return page ? `&offset=${page * ITEMS_PER_PAGE}` : '';
}

function getQuery (query?: string){
  return query ? `&${query}` : '';
}

function getRequestURI(path: Path, query: string, paginator: string){
  const apiPath = `${MARVEL_API}/${path}`;
  return `${apiPath}?${API_SIGN}${query}${paginator}`;
}

export async function useFetch(requestUri: string): Promise<Comics | Characters>{
  const res = await fetch(requestUri);
  const jsonRes = await res.json();
  return jsonRes.data as Comics | Characters;
}

interface ApiOptions {
  query?: string;
  page?: number;
}

export async function useMarvelAPI(path: Path, options: ApiOptions): Promise<Comics | Characters>{
  try {
  const pagination = getPagination(options.page);
  const query = getQuery(options.query);

  const requestURI = getRequestURI(path, query, pagination);
  return useFetch(requestURI);
  } catch {
    throw new Error('An error occurred while trying to get Marvel data')
  }
}

export const useComics = async (page: number = 0): Promise<Comics> => {
  return await useMarvelAPI(Path.COMICS, { page }) as Comics;
}

export async function useCharacterSearch(query: string, page: number = 0): Promise<Characters>{
  return await useMarvelAPI(Path.CHARACTERS, {query: `nameStartsWith=${query}`, page}) as Characters
}