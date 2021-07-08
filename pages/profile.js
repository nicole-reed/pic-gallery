import Head from 'next/head'
import Layout from '../components/layout'
import { useSession } from 'next-auth/client'
import React from 'react'

export default function Profile() {
    const [session, loading] = useSession()

    return (
        <div >
            <Head>
                <title>Profile</title>
            </Head>
            <Layout>

                <main>
                    <h1>This is where all the pics will be.</h1>
                </main>
                {session && <>
                    Images curated by: {session.user.name}
                </>}
            </Layout>
        </div>
    )
}

