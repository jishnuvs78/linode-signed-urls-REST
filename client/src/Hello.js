import React, {useEffect,useState} from 'react';
const superagent = require('superagent');

export const Hello = () => {

    const [val,setVal] = useState('')
    const [url,setUrl] = useState('')

    const [view,setView] = useState('')
    const [viewUrl,setViewUrl] = useState('')

    const [del,setDel] = useState('')
    const [delUrl,setDelUrl] = useState('')
 
    useEffect(async()=>{
        await fetch("http://localhost:3001/api/rest/upload").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>{
          setVal(jsonRes.filename)
          setUrl(jsonRes.presignedUrl)
        })

        await fetch("http://localhost:3001/api/rest/view").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>{
          setView(jsonRes.filename)
          setViewUrl(jsonRes.presignedUrl)
        })

        await fetch("http://localhost:3001/api/rest/delete").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>{
          setDel(jsonRes.filename)
          setDelUrl(jsonRes.presignedUrl)
        })
    },[])

    const submitHandler=()=>{
      const Request = superagent.put(url);
      Request.set({
        'content-type': '.pdf',
        'x-amz-acl': 'public-read',
        'Key': val
    })
      Request.send(val)
      

      Request.end((err, response) => {
          if (err) {
              console.error(err);
              return Promise.reject(err);
          }
        
          
        
          this.submitHandler({
              avatar: url,
          });
      });
    }

    const viewHandler=()=>{
      const Request = superagent.get(viewUrl);
      Request.set({
        'content-type': '.pdf',
        'x-amz-acl': 'public-read',
        'Key': view
    })
      Request.send(view)
      

      Request.end((err, response) => {
          if (err) {
              console.error(err);
              return Promise.reject(err);
          }
        
          
        
          this.submitHandler({
              avatar: viewUrl,
          });
      });
    }

    const deleteHandler=()=>{
      const Request = superagent.delete(delUrl);
      Request.set({
        'content-type': '.pdf',
        'x-amz-acl': 'public-read',
        'Key': del
    })
      Request.send(del)
      

      Request.end((err, response) => {
          if (err) {
              console.error(err);
              return Promise.reject(err);
          }
        
          
        
          this.submitHandler({
              avatar: delUrl,
          });
      });
    }


  return (
    <>
    <div>{val}</div>
    <button onClick={submitHandler}>submit</button>
    <button onClick={viewHandler}>view</button>
    <button onClick={deleteHandler}>delete</button>
    </>
  )
}