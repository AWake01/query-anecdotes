import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

import App from './App'
import { NotifactionContextProvider } from './NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
<NotifactionContextProvider>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
</NotifactionContextProvider>
)