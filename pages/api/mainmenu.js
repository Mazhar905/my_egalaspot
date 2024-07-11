// pages/api/mainMenu.js
import MainMenu from '@/components/MainMenu.json';

export default function handler(req, res) {
  res.status(200).json(MainMenu);
}
