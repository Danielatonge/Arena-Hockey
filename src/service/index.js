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
    return apiClient.get(url);
  },
  getArena(arenaId) {
    return apiClient.get(`/arena/${arenaId}`);
  },
  getServices(arenaId) {
    return apiClient.get(`/arena/${arenaId}/services`);
  },
  getService(serviceId) {
    return apiClient.get(`/service/${serviceId}`);
  },
  getTeams(arenaId, visible) {
    if (visible) {
      return apiClient.get(`/arena/${arenaId}/teams/visible`);
    }
    return apiClient.get(`/arena/${arenaId}/teams`);
  },
  getTrainers(arenaId, visible) {
    if (visible) {
      return apiClient.get(`/arena/${arenaId}/users/visible`);
    }
    return apiClient.get(`/arena/${arenaId}/users`);
  },
  getEvents(arenaId) {
    return apiClient.get(`/arena/${arenaId}/events`);
  },
  getCities() {
    return apiClient.get(`/arena/cities`);
  },
  getPrices(serviceId) {
    return apiClient.get(`/service/${serviceId}/prices`);
  },
  getArenaByUserId(userId) {
    return apiClient.get(`/user/${userId}/arenas`);
  },
  getServicePrices(serviceId) {
    return apiClient.get(`/service/${serviceId}/prices`);
  },

  putArenaTeam({ arenaTeam, checked }) {
    const payload = {
      arenaId: arenaTeam.arenaId,
      teamId: arenaTeam.team.id,
      visibility: checked ? 0 : 1,
    };
    const id = arenaTeam.id;
    return apiClient.put(`/arena/team?id=${id}`, payload);
  },
  putArenaUser({ arenaUser, checked }) {
    const payload = {
      arenaId: arenaUser.arenaId,
      teamId: arenaUser.user.id,
      visibility: checked ? 0 : 1,
    };
    const id = arenaUser.id;
    return apiClient.put(`/arena/user?id=${id}`, payload);
  },
  putService({ serviceId, service }) {
    return apiClient.put(`/service/${serviceId}`, service);
  },
  putArena({ arenaId, arena }) {
    return apiClient.put(`/arena/${arenaId}`, arena);
  },

  postArena(arena) {
    return apiClient.post("/arena", arena);
  },
  postService(service) {
    return apiClient.post("/service", service);
  },
  postPrice(price) {
    return apiClient.post(`/price`, price);
  },
  postEvent(event) {
    return apiClient.post("/event", event);
  },

  createArenaUser({ arenaId, userId, visibility }) {
    const payload = {
      arenaId,
      userId,
      visibility,
    };
    return apiClient.post(`/arena/user`, payload);
  },
  createArenaTeam({ arenaId, teamId, visibility }) {
    const payload = {
      arenaId,
      teamId,
      visibility,
    };
    return apiClient.post(`/arena/team`, payload);
  },
  createArenaTrainer({ arenaId, trainerId, visibility }) {
    const payload = {
      arenaId,
      userId: trainerId,
      visibility,
    };
    return apiClient.post(`/arena/user`, payload);
  },

  deleteService(serviceId) {
    return apiClient.delete(`/service/${serviceId}`);
  },
  deletePrice(priceId) {
    return apiClient.delete(`/price/${priceId}`);
  },
  deleteArena(arenaId) {
    return apiClient.delete(`/arena/${arenaId}`);
  },
  deleteEvent(eventId) {
    return apiClient.delete(`/event/${eventId}`);
  },
  deleteTeam({ arenaId, teamId }) {
    return apiClient.delete(`/arena/${arenaId}/team/${teamId}`);
  },
  deleteTrainer({ arenaId, trainerId }) {
    return apiClient.delete(`/arena/${arenaId}/user/${trainerId}`);
  },
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
  getForums(teamId) {
    return apiClient.get(`/team/${teamId}/forums`);
  },

  deleteTeam(teamId) {
    return apiClient.delete(`/team/${teamId}`);
  },
};

export const apiUser = {
  filterTeams({ userId, userTeamFilter }) {
    //TODO: will finally change to this in future
    const { page, search, numItems, sort_asc, address, type } = userTeamFilter;
    const url =
      `/user/${userId}/teams/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
      `&queryString=${search}&sortBy=${sort_asc.key}&type=${type.key}`;
    return apiClient.get(url);
  },
  filterArenas({ userId, userArenaFilter }) {
    //TODO: will finally change to this in future
    const { page, search, numItems, sort_asc, address, type } = userArenaFilter;
    const url =
      `/user/${userId}/arenas/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
      `&queryString=${search}&sortBy=${sort_asc.key}&type=${type.key}`;
    return apiClient.get(url);
  },
  getTeams(userId) {
    // TODO: Temporal
    return apiClient.get(`/user/${userId}/teams`);
  },
  getArenas(userId) {
    // TODO: Temporal
    return apiClient.get(`/user/${userId}/arenas`);
  },
  deleteArena(arenaId) {
    return apiClient.delete(`/arena/${arenaId}`);
  },
  getUser(userId) {
    return apiClient.get(`/user/${userId}`);
  },
};

export const apiForum = {
  filterForum(filter, type) {
    const { page, search, numItems, sort_asc, address } = filter;
    const url =
      `/forum/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
      `&queryString=${search}&sortBy=${sort_asc.key}&type=${type}`;
    console.log(url);
    return apiClient.get(url);
  },
  getForums() {
    return apiClient.get(`/forums`);
  },
  getCities() {
    return apiClient.get(`/forums/cities`);
  },
};

export const apiSchool = {
  filterSchools(filter, type) {
    const { city, currentPage, pageSize, queryString, sortBy } = filter;
    const url =
      `/school/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
      `&queryString=${queryString}&sortBy=${sortBy}&type=${type}`;
    console.log(url);
    return apiClient.get(url);
  },
  getSchools() {
    return apiClient.get(`/schools`);
  },
  getCities() {
    return apiClient.get(`/schools/cites`); //TODO: correctly spell out
  },
};

export const apiTeamPlayer = {
  filterTeams({ city, currentPage, pageSize, queryString, sortBy }) {
    const url =
      `/team/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
      `&queryString=${queryString}&sortBy=${sortBy}`;
    return apiClient.get(url);
  },
  filterPlayers({ city, currentPage, pageSize, queryString, sortBy }) {
    const url =
      `/user/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
      `&queryString=${queryString}&sortBy=${sortBy}&role=PLAYER`;
    console.log(url);
    return apiClient.get(url);
  },
  getTeams() {
    return apiClient.get(`/teams`);
  },
  getPlayers() {
    return apiClient.get(`/users`);
  },
  getTeamCities() {
    return apiClient.get(`/team/cities`);
  },
  getPlayerCities() {
    return apiClient.get(`/user/cities`);
  },
  getTrainers() {
    return apiClient.get(`/user?role=TRAINER`);
  },
};
