import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from "react-loader-spinner";
// import DarkModeToggle from "react-dark-mode-toggle";
import './App.css';

const Meme = () => {

    //  const [isDarkMode, setIsDarkMode] = useState(() => false);

    const [memes, setMemes] = useState([]);
    const [index, setIndex] = useState(0);
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const randomValueFunction = (a) => {
        for (let i = a.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * i);
            const t = a[i];
            a[i] = a[j];
            a[j] = t;
            }
    }
    const updateText = (e, i) => {
        const t = e.target.value || '';
        setText(text.map((c, j) =>
         { if (j === i)
            return t;
          else
            return c}
        ))
    }

    const generateMeme = () => {
        setLoading(true);
        const currentMeme = memes[index];
        const formData = new FormData();

        formData.append('username','sauravpathak');
        formData.append('password','9806858362');
        formData.append('template_id', currentMeme.id);
        text.forEach((c, i) => formData.append(`boxes[${i}][text]`, c));


        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body:formData
        }).then(res => {
            res.json().then(res => {
                setLoading(false)
                navigate(`/generated?url=${res.data.url}`)
                // console.log(res.data);
            })
        })
       
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then((res) => {
            res.json().then(res => {
                const meme = res.data.memes;
                randomValueFunction(meme)
                setMemes(meme);
            });
        })
    }, []);
    useEffect(() => {
        if (memes.length)
        {
            setText((Array(memes[index].box_count)).fill(''))
            
            }
    },[index,memes])


    return (
        
        loading ? <div>
           <Loader type="BallTriangle" color="#fff" height={200} width={200} className="layout" />
        </div> :
            memes.length ? <div className='container'> 
                            
          
            <div className="lay1">
                   <img src={memes[index].url} alt="fhf" className="image" /> 
                </div>
                <div className="lay2">


            
            {
                text.map((t, i) => {
                    return (
                        <input onChange={(e) =>updateText(e,i)} key={i} placeholder='add text here' className='input-field' />
                    );
              })
            }
            <button className='glow-on-hover' onClick={generateMeme}>Generate</button>
                    <button className='glow-on-hover' onClick={() => setIndex(index + 1)}>Load another one</button>
            </div>
        </div> :
        <div>
           <Loader type="BallTriangle" color="#fff" height={200} width={200} className="layout" />
        </div>
    )
}

export default Meme
