import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(0.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: `100%`,
                flexShrink: 0
              }}
            />
            <p style={{fontFamily: '\'IBM Plex Sans KR\', sans-serif'}}>
              이 글을 작성한 <b>{author}</b>은...<br/>음악과 운동을 좋아합니다.<br/>서비스를 설계하고 구현하는데 관심이 많습니다.<br/>
              <a style={{ boxShadow: "0 0 0 0" }} href={`https://instagram.com/${social.instagram}`}>🎃</a>
              <a style={{ boxShadow: "0 0 0 0" }} href={`https://www.youtube.com/channel/UC-qJ9aVGyR909i67bf_0jAQ`}>🎸</a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 1080, height: 1080) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          instagram
        }
      }
    }
  }
`

export default Bio
