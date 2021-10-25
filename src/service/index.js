import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api-hockey-io.herokuapp.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const apiArena = {
  getArenas({ city, currentPage, pageSize, queryString, sortBy }) {
    const url =
      `/arena/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
      `&queryString=${queryString}&sortBy=${sortBy}`;
    // console.log(url);
    return apiClient.get(url);
  },
  getArena(id) {
    return apiClient.get(`/arena/${id}`);
  },
  postArena(arena) {
    return apiClient.post("events", arena);
  },
  getServices(arenaId) {
    return apiClient.get(`/arena/${arenaId}/services`);
  },
  getTeams(arenaId) {
    return apiClient.get(`/arena/${arenaId}/teams/visible`);
  },
  getTrainers(arenaId) {
    return apiClient.get(`/arena/${arenaId}/users/visible`);
  },
  getEvents(arenaId) {
    return apiClient.get(`/arena/${arenaId}/events`);
  },
  getCities() {
    return apiClient.get(`/arena/cities`);
  },
  getPrices(serviceId){
    return apiClient.get(`/service/${serviceId}/prices`)
  }
};

export const apiTeam = {
  getTeams() {
    return apiClient.get(`/teams`);
  },
  getTeam(teamId) {
    return apiClient.get(`/team/${teamId}`);
  },
  getArenas(teamId) {
    return apiClient.get(`/team/${teamId}/arenas`);
  },
  getContacts(teamId) {
    return apiClient.get(`/team/${teamId}/contact`);
  },
  getUsers(teamId) {
    return apiClient.get(`/team/${teamId}/users`);
  },
  getCities() {
    return apiClient.get(`/team/cities`);
  },
  getForums(teamId) {
    return apiClient.get(`/team/${teamId}/forums`);
  },
};

export const apiUser = {};

export const apiForum = {
  getForums() {
    return apiClient.get(`/forums`);
  },
  getCities() {
    return apiClient.get(`/forums/cities`);
  },
};

export const apiSchool = {
  getSchools() {
    return apiClient.get(`/schools`);
  },
  getCities() {
    return apiClient.get(`/schools/cities`);
  },
};

export const apiTeamPlayer = {
  getTeams() {
    return apiClient.get(`/teams`);
  },
  getPlayers() {
    return apiClient.get(`/user?role=PLAYER`);
  },
  getTrainers() {
    return apiClient.get(`/user?role=TRAINER`);
  },
};
