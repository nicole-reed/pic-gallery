import Head from 'next/head'
import Layout from '../components/layout'
import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  // const getUrl = async () => {
  //   const res = await axios.post('/api/signed-url', { type: 'getObject', key: 'test.jpeg' })
  //   console.log('response', res)
  // }

  return (
    <div >
      <Head>
        <title>Gallery</title>
      </Head>

      <Layout>
        {/* {!session && <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>} */}

        <main>
          <h1>Welcome to the Gallery</h1>
        </main>

        {/* <button onClick={getUrl}>Get url</button> */}

      </Layout>
    </div>
  )
}
