import React from 'react'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'


function MyUppy() {
    const uppy = useUppy(() => {
        return new Uppy({
            meta: { type: 'avatar' },
            restrictions: {
                maxFileSize: 300000,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*']
            },
            autoProceed: true,
        })
    })

    return <DragDrop uppy={uppy} />
}



// const uppy = new Uppy({
//     meta: { type: 'avatar' },
//     restrictions: {
//         maxFileSize: 300000,
//         maxNumberOfFiles: 1,
//         minNumberOfFiles: 1,
//         allowedFileTypes: ['image/*']
//     },
//     autoProceed: true,
// })

// const AvatarPicker = ({ currentAvatar }) => {
//     return (
//         <div>

//             <DragDrop
//                 uppy={uppy}
//                 locale={{
//                     strings: {
//                         // Text to show on the droppable area.
//                         // `%{browse}` is replaced with a link that opens the system file selection dialog.
//                         dropHereOr: 'Drop here or %{browse}',
//                         // Used as the label for the link that opens the system file selection dialog.
//                         browse: 'browse'
//                     }
//                 }}
//             />
//         </div>
//     )
// }