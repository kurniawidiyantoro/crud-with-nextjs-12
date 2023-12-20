import Head from 'next/head'

const HeadName = ({title}) => {
  return (
<Head>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>{title}</title>
</Head>
  )
}

export default HeadName