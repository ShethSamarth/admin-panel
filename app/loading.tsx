import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Loader className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Loading
