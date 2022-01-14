import { SERVER_URL as base_url } from '../utils/config';
import { Task, MyPlant, User } from '../common/types';

export const getTasksByMonth = async (month = ''): Promise<Task[]> => {
  const JSONtasks = await fetch(`${base_url}/tasks/month/${month}`);
  const tasks = await JSONtasks.json();
  return tasks;
};

export const getMyPlants = async (): Promise<MyPlant[]> => {
  const JSONPlants = await fetch(`${base_url}/myplants`);
  const myPlants = await JSONPlants.json();
  return myPlants;
};

export const saveTask = async (task: Task): Promise<Task> => {
  const JSONTask = JSON.stringify(task);
  const response = await fetch(`${base_url}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONTask,
  });
  return response.json();
};

export const deleteTask = async (_id = ''): Promise<void> => {
  await fetch(`${base_url}/tasks`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id }),
  });
};

interface saveToMyPlantsArgs {
  plant: MyPlant;
  user: User;
  token: string;
}

export const saveToMyPlants = async ({
  plant,
  user,
  token,
}: saveToMyPlantsArgs): Promise<MyPlant> => {
  const JSONBody = JSON.stringify({ plant, user });
  console.log(JSONBody);
  const response = await fetch(`${base_url}/myplants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSONBody,
  });
  return response.json();
};

export const removeFromMyPlants = async (plantID = 0): Promise<MyPlant> => {
  const JSONPlant = JSON.stringify({ plantID });
  const response = await fetch(`${base_url}/myplants`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONPlant,
  });
  return response.json();
};

interface Fixedheight {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

interface GifAnswer {
  images: {
    fixed_height: Fixedheight;
  };
}

export const getGIF = async (query = ''): Promise<GifAnswer[]> => {
  const JSONQuery = JSON.stringify({ query });
  const response = await fetch(`${base_url}/gifs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONQuery,
  });
  return response.json();
};
