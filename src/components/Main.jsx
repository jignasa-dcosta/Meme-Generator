import { useState, useEffect } from "react"

export default function Main() {
    const [memeInfo, setMemeInfo] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "https://i.pinimg.com/736x/73/01/f8/7301f852385759f029ee29299321b4dc.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(()=>{
        fetch ("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(event){
        const {value, name} = event.currentTarget        
        setMemeInfo(prevMemeInfo => ({
            ...prevMemeInfo,
            [name]:value
        }))
    }

    function changeImage() {
        // get a random number from 0 to array.length
        // use that random number to get a random meme
        // obj from the array.
        // Set state

        const randomNumer = Math.floor(Math.random() * allMemes.length)
        //Math.random() generates random decimal number between 0 and 1. Multiplying it with the length of the array scales it up to match the range, ex: if random number is 0.5 and length is 100 the result will be 50 coz of the Math.floor()
        const newMemeUrl = allMemes[randomNumer].url
        setMemeInfo(prevMemeInfo => ({
            ...prevMemeInfo,
            imageUrl: newMemeUrl
        }))
    }
    return(
        <main>
            <div className="form">
                <label> Top Text
                    <input 
                    type="text"
                    placeholder="One does not smiply"
                    name="topText"
                    onChange={handleChange}
                    value={memeInfo.topText}
                    />
                </label>

                <label> Bottom Text
                    <input 
                    type="text" 
                    placeholder="Walk into Mordor"
                    name="bottomText"
                    onChange={handleChange}
                    value={memeInfo.bottomText}
                    />
                </label>
                <button onClick={changeImage}>Get a new meme image 🖼</button>
            </div>

            <div className="meme">
                <img src={memeInfo.imageUrl}/>
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}