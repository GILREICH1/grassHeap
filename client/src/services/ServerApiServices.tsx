import { SERVER_URL as base_url } from '../utils/config';
import { Task, MyPlant, User } from '../common/types';

// TODO
// export const getUserTasks = async (): Promise<Task[]> => {};

export const getTasksByMonth = async (month = ''): Promise<Task[]> => {
  const JSONtasks = await fetch(`${base_url}/tasks/month/${month}`);
  const tasks = await JSONtasks.json();
  return tasks;
};

interface saveTaskArgs {
  task: Task;
  user: User;
  token: string;
}

export const saveTask = async ({
  task,
  user,
  token,
}: saveTaskArgs): Promise<Task | void> => {
  const JSONBody = JSON.stringify({ task, user });
  try {
  const response = await fetch(`${base_url}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
      body: JSONBody,
  });
  return response.json();
  } catch (e) {
    console.error('failed to save task', e);
  }
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

interface removePlantsArgs {
  plantID: number;
  user: User;
  token: string;
}

export const removeFromMyPlants = async ({
  plantID,
  user,
  token,
}: removePlantsArgs): Promise<MyPlant> => {
  const JSONBody = JSON.stringify({ plantID, user });
  const response = await fetch(`${base_url}/myplants`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSONBody,
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
