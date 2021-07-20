import Head from 'next/head'
import Layout from '../components/layout'
import { signIn, useSession } from 'next-auth/client'
import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import axios from 'axios'
import { Dashboard } from '@uppy/react'



export default function Upload() {
    const [session, loading] = useSession()
    console.log('session', session)

    const uppy = new Uppy({
        autoProceed: false,
        debug: true
    })
        .use(AwsS3, {
            limit: 2,
            timeout: 60 * 1000,
            getUploadParameters: async (file) => {
                console.log('fetching url')
                const res = await axios.post('/api/signed-url', { type: 'putObject', key: `${session.user.id}/${file.name}`, contentType: file.type })
                const signedUrl = res.data.signedUrl
                return {
                    method: 'PUT',
                    url: signedUrl,
                    headers: {
                        'Content-Type': file.type
                    }
                }
            }
        })
        .on('file-added', () => console.log('file added'))
        .on('upload-success', async (file) => {

            await axios.post(`/api/users/${session.user.id}/images`, { fileName: file.name, contentType: file.type, caption: file.meta.caption })
        })
        .on('upload-error', (error) => console.log('upload error', error))

    return (
        <div >
            <Head>
                <title>Upload</title>
            </Head>
            <Layout>
                <main>

                    {!session && <>
                        Sign in to add images <br />
                        <button onClick={() => signIn()}>Sign in</button>
                    </>}
                    {session && <>
                        Add new images to {session.user.name}
                        <div className='uploader'>
                            <Dashboard
                                uppy={uppy}
                                metaFields={[
                                    { id: 'caption', name: 'Location', placeholder: 'where was this photo taken?' }
                                ]}
                                theme={'dark'}
                            />
                        </div>

                    </>}

                </main>

            </Layout>

        </div>
    )
}