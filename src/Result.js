import React,{useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { copyImageToClipboard } from 'copy-image-clipboard'
import { useClipboard } from 'use-clipboard-copy'
import { saveAs } from 'file-saver'
const Result = () => {
    const [copied, setCopied] = useState(false);
    const [imageCopied, setImageCopied] = useState(false);
    const [download, setDownload] = useState(false);
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    
    const copyImageLink =() =>{
        clipboard.copy(url);
        setCopied(true);
    }
    
    const copyImage =(url) =>{
             copyImageToClipboard(
                    url
                    )
                    .then(() => {
                        console.log('Image Copied')
                        setImageCopied(true);
                    })
                    .catch((e) => {
                        console.log('Error: ', e.message)
                    })
    }
   
    const downloadImage = (url) => {
        saveAs(url, 'image.jpg') 
        setDownload(true);
    }

    return (
        <div className='container'>
            <div className="lay1">
                   {url && <img src={url} alt="ff"  className="image" />}
            </div>
            <div className="lay2">
                    <button onClick={() =>{navigate('/')}} className='glow-on-hover'> 
                        lets make one more!!
                    </button>
                    <button onClick={() => copyImage(url)} className='glow-on-hover copyImage'>
                        {imageCopied ?  'image Copied' :'Copy Image to clipboard'}
                    </button>
                    <button onClick={() =>{downloadImage(url)}} className='glow-on-hover'>
                        {download ?  'image Downloaded':' Download!'}
                    </button>
                    <button onClick={copyImageLink} className='glow-on-hover'> 
                    {copied ? 'Link Copied!':'Copy Link'}
                    </button>
            </div>
           
        </div>
    )
}

export default Result
