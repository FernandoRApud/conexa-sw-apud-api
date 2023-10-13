// import supertest from 'supertest';
// import app from '../..';
import { IPeople } from '../interfaces/IPeople';
import {
  getAllPeoples, getPeoplesByPage, getPeoplesBySearch, getPeoplesBySearchAndPage, getPeople, batchHomeworld, batchFilms, batchSpecies, batchVehicles, batchStarships,
} from '../services/people.services';

it('should return all people when no search parameter is provided', async () => {
  const result = await getAllPeoples();
  expect(result.results).not.toHaveLength(0);
  expect(result.results).not.toEqual([]);
}, 20000);

it('should return filtered people when search parameter is provided', async () => {
  const search = 'Luke';
  const result = await getPeoplesBySearch(search);
  const containsName = result.results.some((item: IPeople) => item.name.includes(search));
  const notContainsName = result.results.some((item: IPeople) => !item.name.includes(search));
  expect(containsName).toBe(true);
  expect(notContainsName).toBe(false);
}, 20000);

it('should return empty results array when no people are found', async () => {
  const search = 'Nonexistent';
  const result = await getPeoplesBySearch(search);
  expect(result).toEqual({
    count: 0, next: null, previous: null, results: [],
  });
}, 20000);

it('should support pagination through API parameters', async () => {
  const page = '2';
  const result = await getPeoplesByPage(page);
  expect(result.results).not.toHaveLength(0);
  expect(result.results).not.toEqual([]);
}, 20000);

it('should return filtered people when search and page parameters are provided', async () => {
  const page = '1';
  const search = 'Luke';
  const result = await getPeoplesBySearchAndPage(search, page);
  const containsName = result.results.some((item: IPeople) => item.name.includes(search));
  expect(containsName).toBe(true);
}, 20000);

it('shoudl return people filtered by id, when its provided', async () => {
  const id = '2';
  const result = await getPeople(id);
  expect(result).not.toEqual({});
}, 20000);

it('should return homeworld batching data of people specific', async () => {
  const id = '1';
  const result = await getPeople(id);
  const batch = await batchHomeworld(result);
  expect(batch).toEqual(expect.objectContaining({ name: expect.any(String) }));
}, 20000);

it('should return films batching data of people specific', async () => {
  const id = '1';
  const result = await getPeople(id);
  const batch = await batchFilms(result);
  expect(batch).not.toHaveLength(0);
  expect(batch).not.toEqual([]);
}, 20000);

it('should return species batching data of people specific', async () => {
  const id = '2';
  const result = await getPeople(id);
  const batch = await batchSpecies(result);
  expect(batch).not.toHaveLength(0);
  expect(batch).not.toEqual([]);
}, 20000);

it('should return vehicles batching data of people specific', async () => {
  const id = '1';
  const result = await getPeople(id);
  const batch = await batchVehicles(result);
  expect(batch).not.toHaveLength(0);
  expect(batch).not.toEqual([]);
}, 20000);

it('should return starships batching data of people specific', async () => {
  const id = '1';
  const result = await getPeople(id);
  const batch = await batchStarships(result);
  expect(batch).not.toHaveLength(0);
  expect(batch).not.toEqual([]);
}, 20000);
