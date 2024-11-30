import { API_URL } from '../../constants/env';
import { Monster,BattleResult } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const postBattle = async (monster1Id: string, monster2Id: string ):Promise<BattleResult> => {
  try {

    const response = await fetch(`${API_URL}/battle`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',

      },
      body: JSON.stringify({
        monster1Id,
        monster2Id
      })
    })

    if(!response.ok){
      throw new Error(`Error in POST /battle ${response.statusText}`)
    }

    return await response.json();

  }catch (error){
    console.error('Error posting battle:', error)
    throw error;
  }
}

export const MonsterService = {
  getAll,
  postBattle
};
