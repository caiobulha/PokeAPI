import '../Styles/Card.css'
import fire from '../assets/backgrounds/fire.gif'
import water from '../assets/backgrounds/water.gif'
import dark from '../assets/backgrounds/dark.gif'
import defaul from '../assets/backgrounds/default.jpg'
import dragon from '../assets/backgrounds/dragon.gif'
import fight from '../assets/backgrounds/fight.jfif'
import flying from '../assets/backgrounds/flying.webp'
import ghost from '../assets/backgrounds/ghost.gif'
import ice from '../assets/backgrounds/ice.gif'
import plant from '../assets/backgrounds/plant.gif'
import psyche from '../assets/backgrounds/psych.gif'
import space from '../assets/backgrounds/space.gif'
import stone from '../assets/backgrounds/stone.png'
import electric from '../assets/backgrounds/eletric.gif'
import Sparkles from '../assets/sparkles.png'
import hd from '../assets/hd.png'
import { useEffect, useState } from 'react'
import { FiArrowUp } from "react-icons/fi";
import Paragraph from './Paragraph'

function Card({name, description, weight, height, captureRate, img, bg, type, num, shiny, legendary, highQuality, hp, attack, spAttack, spDefence, speed}) {
    const[sparkling, setSparkling] = useState(false)
    const[descs, setDesc] = useState([])
    const[HD, setHD] = useState()
    const[stats, setStats] = useState(false)
    const typesObject = {
        'fire': fire,
        'water': water,
        'dark': dark,
        'dragon': dragon,
        'fight': fight,
        'flying': flying,
        'ghost': ghost,
        'ice': ice,
        'grass': plant,
        'psychic': psyche,
        'ground': stone,
        'stone': stone,
        'normal': defaul,
        'steel': space,
        'fairy': defaul,
        'bug': plant,
        'poison': plant,
        'electric': electric
    }

    function writeFlavors() {
        var descriptions = []
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`, {
            "method": "GET"
        }).then(response => {
            response.json().then(data => {
                for(var i = 1; i<22; i++) {
                    descriptions.push(<Paragraph content={data.flavor_text_entries[i].flavor_text}></Paragraph>)
                    descriptions.push(<Paragraph content={data.flavor_text_entries[i].version.name} style></Paragraph>)
                }
                setDesc(descriptions)
                setTimeout(() => setStats(true), 500)
            })
        })
    }
    useEffect(() => (
        writeFlavors()

    ), [])

    return(
        <div className='card'>
            <div className="imgSpace" style={{backgroundImage: `url(${typesObject[bg]})`}}>
                <div className="icons">
                    <img src={Sparkles} alt="Sparkles" onClick={() => setSparkling(!sparkling)} className='sparkling'/>
                    <img src={hd} alt="Sparkles" onClick={() => setHD(!HD)} className='sparkling hd'/>
                </div>
                <h1>{name}</h1>
                <img src={sparkling ?  shiny : HD ?  highQuality: img} alt="Pokemon Image" className='image'/>
                <h1>#{num}</h1>
            </div>
            <div className="contentSpace">
                    <div className="types">
                        {type}
                    </div>
                    <div className="stats">
                        <div className='statsName'>
                            <span>HP:</span>
                            <span>Attack: </span>
                            <span>Special Attack: </span>
                            <span>Special Defense: </span>
                            <span>Speed: </span>
                        </div>
                        <div className="statsInfo">
                            <div className="bar" style={{width: stats && `${hp * 1.5}px`}}>{hp}</div>
                            <div className="bar" style={{width: stats && `${attack * 1.5}px`}}> {attack} </div>
                            <div className="bar" style={{width: stats && `${spAttack * 1.5}px`}}>{spAttack} </div>
                            <div className="bar" style={{width: stats && `${spDefence * 1.5}px`}}>{spDefence}</div>
                            <div className="bar" style={{width: stats && `${speed * 1.5}px`}}>{speed}</div>
                        </div>
                    </div>

                    <div className="flavorComplements">
                        {descs}
                    </div>
                    <div className="flavor">
                        <p>{description}</p>
                        <FiArrowUp style={{position: "absolute", bottom: "0", right: "0", margin: "10px"}}/>
                    </div>
                    <div className="legendary">
                    {legendary && <p>Legendary</p>}
                    </div>
                </div>
        </div>
    )
}

export default Card