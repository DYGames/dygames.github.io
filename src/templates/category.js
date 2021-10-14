import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'

export default class BlogCategory extends React.Component {
    render() {
        const { data } = this.props
        const posts = data.allMdx.edges
        const siteTitle = this.props.data.site.siteMetadata.title
        console.log(this.props.pageContext)

        return (
            <Layout location={this.props.location} title={siteTitle}>
              <h1>{this.props.pageContext.category}</h1>
              {posts.filter((item, idx) => item.node.frontmatter.category.toLowerCase() == this.props.pageContext.category.toLowerCase()).map(({ node }) => {
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
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
