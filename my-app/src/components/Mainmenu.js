import React from 'react'

const Mainmenu = ({persons}) => {
  return (
    <>
    <h1>Mainmenu</h1>
    <dev>
        <p><a href='#'>新規登録</a></p>
        <p><a href='#'>参照</a></p>
        <p>{persons[0]}</p>
    </dev>
    </>
  )
}

export default Mainmenu