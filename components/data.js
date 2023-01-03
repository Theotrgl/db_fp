export const data = [
  {
    title: "mlbb",
    price: 90,
    type: "ACTION MOBA",
    body: "Mobile Legends: Bang Bang",
    imgUrl: "https://cdn.popculture.id/wp-content/uploads/2021/12/moba1.png",
  },
  {
    title: "gi",
    price: 90,
    type: "ACTION RPG",
    body: "Genshin Impact",
    imgUrl:
      "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S1_2560x1440-91c6cd7312cc2647c3ebccca10f30399",
  },
  {
    title: "hi",
    price: 90,
    type: "ACTION RPG",
    body: "Honkai Impact",
    imgUrl: "https://i.ytimg.com/vi/d1yJUdaSUBc/maxresdefault.jpg",
  },
  {
    title: "cs",
    price: 90,
    type: "ACTION TACTICAL",
    body: "Counter-Side",
    imgUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1976440/capsule_616x353.jpg?t=1662018056",
  },
  {
    title: "wmw",
    price: 90,
    type: "KIDS",
    body: "Where's my Water",
    imgUrl: "https://i.ytimg.com/vi/kUm56ULlphM/maxresdefault.jpg",
  },
];

import React from "react";
import api from "../DatabaseConn";

export default getHomeItems = async () => {
  let response = null;
  const result = async () => {
    try {
      const options = {
        method: "GET",
      };
      const res = await fetch(api + "/game/all", options);
      try {
        const responseData = await res.json();
        response = responseData;
      } catch (err) {
        const res = await fetch(api + "/game/all", options);
        const responseData = await res.json();
        response = responseData;
      }
    } catch (err) {
      console.log(err);
    }

    if (response.length === 0) {
      console.log("empty");
    }

    return response;
  };

  return await result();
};

export const getSpecialItems = async () => {
  let response = null;
  const result = async () => {
    try {
      const options = {
        method: "GET",
      };
      const res = await fetch(api + "/game/allsales", options);
      try {
        const responseData = await res.json();
        response = responseData;
      } catch (err) {
        const res = await fetch(api + "/game/allsales", options);
        const responseData = await res.json();
        response = responseData;
      }
    } catch (err) {
      console.log(err);
    }

    if (response.length === 0) {
      console.log("empty");
    }

    return response;
  };

  return await result();
};
