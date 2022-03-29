import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  page
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { page, onDelete } = props

  const deletePage = () => {
    setOpenDelete(false)
    onDelete(page.id)
  }

  const pageName =
    page && page.meta_title && page.meta_title.length > 0
      ? page.meta_title
      : "Draft"

  if (page && !page.is_system)
    return (
      <>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.actions_delete}
          onClick={() => setOpenDelete(true)}
        >
          <FontIcon color="#fff" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
        {page.enabled && (
          <a href={page.url} target="_blank" rel="noreferrer">
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.viewOnWebsite}
            >
              <FontIcon color="#fff" className="material-icons">
                open_in_new
              </FontIcon>
            </IconButton>
          </a>
        )}
        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={pageName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deletePage}
        />
      </>
    )

  return null
}

export default Buttons
