import AppSidebar from '@/features/dashboard/components/app-sidebar'
import Header from '@/features/dashboard/components/header'
import { useMediaQuery } from '@react-hook/media-query'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function DashboardPage() {
  const [isSideOpen, setIsSideOpen] = useState(false)
  const isTablet = useMediaQuery('(max-width: 425px)')
  
  const onSideBarButtonClickHandler = () => {
    setIsSideOpen((prev) => !prev)
  }
  const onDivCloseClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isSideOpen === true && isTablet) {
      setIsSideOpen(false)
    }

  }
  return (
    <div className="flex">
      <AppSidebar
        className={`transition-all duration-300 ease-initial z-10 ${
          isSideOpen ? '1xm:w-92 2xm:w-80 w-68 md:w-54' : 'w-0 md:w-10'
        }`}
      />
      <div className={`bg-popover flex flex-1 flex-col`}>
        <Header onSideBarButtonClick={onSideBarButtonClickHandler} />
        {/* <Main /> */}
        <Outlet />
      </div>

      {isSideOpen && (
        <div
          onClick={onDivCloseClickHandler}
          className={`bg-foreground/10 fixed inset-0 md:hidden`}
        />
      )}
    </div>
  )
}

export default DashboardPage
