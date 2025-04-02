import { AlertTriangle } from "lucide-react"

const ErrorAlert = ({ message }) => {
  return (
    <div
      className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded relative"
      role="alert"
    >
      <div className="flex items-center">
        <AlertTriangle className="mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  )
}

export default ErrorAlert

