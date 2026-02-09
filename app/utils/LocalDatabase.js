import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const USERS_KEY = '@local_db_users';

const initialize = async () => {
  const existing = await AsyncStorage.getItem(USERS_KEY);
  if (!existing) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

const hashPassword = async (password) => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
};

const getUsers = async () => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const addUser = async (userData) => {
  const users = await getUsers();
  const exists = users.find(
    (u) => u.email.toLowerCase() === userData.email.toLowerCase()
  );
  if (exists) {
    throw new Error('El correo ya existe');
  }

  const hashedPassword = await hashPassword(userData.password);
  const newUser = {
    id: Crypto.randomUUID(),
    name: userData.name,
    lastname: userData.lastname,
    gender: userData.gender,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    tel: userData.tel,
    birthday: userData.birthday,
    type: userData.type || 'Common',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

const findUserByEmail = async (email) => {
  const users = await getUsers();
  return users.find((u) => u.email === email.toLowerCase()) || null;
};

const getUserById = async (id) => {
  const users = await getUsers();
  return users.find((u) => u.id === id) || null;
};

export default { initialize, addUser, findUserByEmail, getUserById, hashPassword };
