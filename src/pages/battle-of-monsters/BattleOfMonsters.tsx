import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"
import { Monster } from "../../models/interfaces/monster.interface"
import { MonsterService } from "../../reducers/monsters/monsters.service"
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)

    const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
    
    const [winner, setWinner] = useState<Monster | null>(null);

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, []);

    const handleStartBattleClick = async() => {
        // Fight!

        if(!selectedMonster || !computerMonster){

            alert('No monster selected! Please select a monster first.')
            return;
        }


        try{

            const result = await MonsterService.postBattle(selectedMonster?.id,computerMonster?.id)
            console.log('Battle Result ',result)

            if(result.tie){

                alert('Tie!')
            }else{
                setWinner(result.winner)
            }

        }catch(error){
            console.log('Failed to fetch battle result:', error)
        }
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} setComputerMonster = {setComputerMonster} setWinner={setWinner} />

            {winner ? <WinnerDisplay text={winner.name}/> :null}

            <BattleSection>
                <MonsterBattleCard title={selectedMonster?.name || "Player"} monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title={computerMonster?.name || "Computer"} monster={computerMonster}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }