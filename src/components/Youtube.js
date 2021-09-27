import React from "react"

const Youtube = props => (
    <div style={{textAlign: 'center'}}>
        <iframe 
            title="YoutubeIframe" 
            width="700" 
            height="393" 
            src={`https://youtube.com/embed/${props.yid}`} 
            frameBorder={`0`} 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
    </div>
)

export default Youtube;