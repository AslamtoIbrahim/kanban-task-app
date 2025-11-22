import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { authService } from './features/auth/auth.service'
import DashboardPage from './pages/dashboard-page'
import { Spinner } from './shared/components/ui/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  const { data, error, isPending } = authService.useSession()
  const navigate = useNavigate()

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    )
  }

  if (!data?.user) {
    navigate('/login')
    return null
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
        <ToastContainer />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
