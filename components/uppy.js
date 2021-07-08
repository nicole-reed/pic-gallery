import React from 'react'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { DragDrop } from '@uppy/react'

const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
})

const AvatarPicker = ({ currentAvatar }) => {
    return (
        <div>
            <img src={currentAvatar} alt="Current Avatar" />
            <DragDrop
                uppy={uppy}
                locale={{
                    strings: {
                        // Text to show on the droppable area.
                        // `%{browse}` is replaced with a link that opens the system file selection dialog.
                        dropHereOr: 'Drop here or %{browse}',
                        // Used as the label for the link that opens the system file selection dialog.
                        browse: 'browse'
                    }
                }}
            />
        </div>
    )
}