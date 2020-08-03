import React ,{useState} from 'react'
import {Button} from "@material-ui/core";
import {storage,db} from "./firebase";
import firebase from "firebase"
import './ImageUploads.css'

function ImageUploads({username}) {
    const [caption,setCaption] =useState('');
    const[progress,setProgress] = useState(0);
    const [image,setImage] = useState(null);

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                     const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                     );
                
                setProgress(progress);
            },
            (error) =>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                
                .then(url => {
                   
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username,
                    })
                    .catch((error) =>alert(error.message));
                    setProgress(0);
                    setCaption('')
                    setImage(null);
                 
                })
            }
        )
    }
    return (
        <div className="image_upload">
            <progress className="progress_bar" value={progress} max="100" />
            <input  className="comment" type="text" placeholder="Enter a caption" onChange={event =>setCaption(event.target.value)} value={caption} />
            <input  className="choose" type="file" onChange={handleChange} />
            <div className="button">
            <Button  onClick={handleUpload}>
                Upload
            </Button>
            </div>
          
        </div>
    )
}

export default ImageUploads
