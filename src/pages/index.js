import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const categories = posts.map(post => post.node.frontmatter.category)
    
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <h3 style={{ margin: "0px" }}>Category</h3><br/>
        <ul style={{ listStyle: "none", marginLeft: "0" }}>
          {categories.filter((item, index) => categories.indexOf(item) === index).map(( category ) => {
            console.log(category)
              return (<li key={category} style={{ display: "inline-block", margin: "0 10px 0 10px"}}>
                <Link style={{ boxShadow: "0 0 0 0" }} to={`/categories/${category}/`}>
                  <div style={{ backgroundColor: "rgba(241, 243, 244, 1)", 
                                border: "0px solid black", 
                                color: "black",
                                fontFamily: "Montserrat,Georgia,sans-serif",
                                borderRadius: "500px",
                                fontSize: "inherit",
                                height: "40px",
                                lineHeight: "40px",
                                outline: "none",
                                position: "relative",
                                textAlign: "center",
                                width: "100px"}}>
                <b>{category}</b></div>
                </Link>
              </li>
            )})}
        </ul>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p style={{fontFamily: '\'IBM Plex Sans KR\', sans-serif'}} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
`
