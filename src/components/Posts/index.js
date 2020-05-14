import React from 'react'

import './posts.css'

export default function Posts () {

  return (
    <div className='users-posts'>
    	<div className="post white_bg default-box">
    		<div className="post-header d-flex justify-content-between">
    			<div className="post-tittle">
    			<p className="weight-500">Lorem ipsum dolor sit amet?</p>
    			<span>by Uganda User</span>
    			</div>
    			<div className="post-votation d-flex justify-content-between">
						<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#F3A712"/>
						</svg>
						<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 0L13.4952 11.25H0.504809L7 0Z" fill="#6E87DE"/>
						</svg>
    			</div>
    		</div>
    		<div className="post-content gray_bg">
    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum, erat quis elementum molestie,
    			purus est pretium neque, ac tincidunt leo tellus blandit nisi. Duis ac velit eu dolor accumsan consequat at
    			at felis. Aenean consequat turpis eget lacus maximus ornare. Suspendisse eu magna sapien. Praesent eu dictum
    			felis. Sed tincidunt nisi bibendum pellentesque semper.</p>
    		</div>
    	</div>
    </div>
  )
}

/*



*/
