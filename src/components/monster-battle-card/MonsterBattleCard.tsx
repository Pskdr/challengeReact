import { Monster } from "../../models/interfaces/monster.interface"
import { MonsterName } from "../monsters-list/MonstersList.styled"
import { BattleMonsterCard, BattleMonsterTitle, Image,ProgressBar } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
    return (
        <BattleMonsterCard centralized>
            {monster ? 
            
            <div>
                <BattleMonsterCard>
                    <Image src={monster.imageUrl}/>
                    <BattleMonsterTitle>{monster.name}</BattleMonsterTitle>
                    <hr></hr>
                    <MonsterName>HP</MonsterName>
                    <ProgressBar variant="determinate" value={monster.hp}/>
                    
                    <MonsterName>Attack</MonsterName>
                    <ProgressBar variant="determinate" value={monster.attack}/>
                    
                    <MonsterName>Defense</MonsterName>
                    <ProgressBar variant="determinate" value={monster.defense}/>
                    
                    <MonsterName>Speed</MonsterName>
                    <ProgressBar variant="determinate" value={monster.speed}/>

                </BattleMonsterCard>
            </div>: 
            
            <BattleMonsterTitle>{title!}</BattleMonsterTitle>}

        </BattleMonsterCard>
    )
}

export { MonsterBattleCard }